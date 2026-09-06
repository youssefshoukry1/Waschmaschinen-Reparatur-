"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type MatterNamespace from "matter-js";

import { business } from "@/lib/business";

const physics = {
  gravity: { x: 0, y: 1 },
  restitution: 0.5,
  friction: 0.15,
  frictionAir: 0.02,
  density: 0.002,
  wallThickness: 200,
  mouseStiffness: 0.6,
};

// Alternating image tiles and words, in the order they drop into the pile.
const objects: Array<{ type: "image"; src: string } | { type: "word"; label: string }> = [
  { type: "image", src: "/images/services/1.webp" },
  { type: "word", label: "Festpreis" },
  { type: "image", src: "/images/services/2.webp" },
  { type: "word", label: "Garantie" },
  { type: "image", src: "/images/services/3.webp" },
  { type: "word", label: "Vor Ort" },
  { type: "image", src: "/images/services/4.webp" },
  { type: "word", label: "Berlin" },
  { type: "image", src: "/images/services/5.webp" },
  { type: "word", label: "Termin" },
  { type: "image", src: "/images/services/6.webp" },
  { type: "word", label: "Reparatur" },
];

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

type Matter = typeof MatterNamespace;

// @types/matter-js omits the DOM listeners Mouse.create attaches at runtime.
type MouseWithHandlers = MatterNamespace.Mouse & {
  mousewheel: EventListener;
  mousemove: EventListener;
  mousedown: EventListener;
  mouseup: EventListener;
};

type PhysicsHandle = {
  setActive: (active: boolean) => void;
  destroy: () => void;
};

function initPhysics(Matter: Matter, container: HTMLDivElement): PhysicsHandle | null {
  const containerRect = container.getBoundingClientRect();
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(".gravity-cta__object"),
  );
  if (!containerRect.width || !containerRect.height || !elements.length) return null;

  const engine = Matter.Engine.create();
  engine.gravity.x = physics.gravity.x;
  engine.gravity.y = physics.gravity.y;
  // The source ran 20/16/10 iterations. That is far more solver work than a
  // dozen boxes need, and it showed up as scroll jank; these still settle cleanly.
  engine.constraintIterations = 4;
  engine.positionIterations = 8;
  engine.velocityIterations = 6;
  engine.timing.timeScale = 1;
  // Once the pile settles, sleeping bodies drop out of the solver entirely.
  engine.enableSleeping = true;

  const thickness = physics.wallThickness;
  Matter.World.add(engine.world, [
    // Floor, then the two side walls.
    Matter.Bodies.rectangle(
      containerRect.width / 2,
      containerRect.height + thickness / 2,
      containerRect.width + thickness * 2,
      thickness,
      { isStatic: true },
    ),
    Matter.Bodies.rectangle(
      -thickness / 2,
      containerRect.height / 2,
      thickness,
      containerRect.height + thickness * 2,
      { isStatic: true },
    ),
    Matter.Bodies.rectangle(
      containerRect.width + thickness / 2,
      containerRect.height / 2,
      thickness,
      containerRect.height + thickness * 2,
      { isStatic: true },
    ),
  ]);

  const bodies = elements.map((element, index) => {
    const { width, height } = element.getBoundingClientRect();
    const body = Matter.Bodies.rectangle(
      Math.random() * Math.max(containerRect.width - width, 0) + width / 2,
      -500 - index * 200,
      width,
      height,
      {
        restitution: physics.restitution,
        friction: physics.friction,
        frictionAir: physics.frictionAir,
        density: physics.density,
      },
    );
    Matter.Body.setAngle(body, (Math.random() - 0.5) * Math.PI);
    Matter.World.add(engine.world, body);
    return { body, element, width, height };
  });

  // Cap the container once everything has dropped in, so nothing can be flung out.
  const topWallTimer = window.setTimeout(() => {
    Matter.World.add(
      engine.world,
      Matter.Bodies.rectangle(
        containerRect.width / 2,
        -thickness / 2,
        containerRect.width + thickness * 2,
        thickness,
        { isStatic: true },
      ),
    );
  }, 5000);

  // Dragging stays pointer-only: Matter's touch handlers swallow touchmove,
  // which would trap the page scroll on phones.
  const draggable = window.matchMedia("(pointer: fine)").matches;
  let releaseDrag: (() => void) | null = null;
  let detachMouse: (() => void) | null = null;

  if (draggable) {
    const mouse = Matter.Mouse.create(container) as MouseWithHandlers;
    // Matter binds 'wheel' as non-passive and calls preventDefault() on it, which
    // blocks page scrolling anywhere over the container - the whole screen, now
    // that the section is full-bleed. Its touch handlers do the same to touchmove.
    // Dragging here is driven by mouse events only, so detach all four.
    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("touchmove", mouse.mousemove);
    mouse.element.removeEventListener("touchstart", mouse.mousedown);
    mouse.element.removeEventListener("touchend", mouse.mouseup);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: physics.mouseStiffness, render: { visible: false } },
    });
    mouseConstraint.mouse.element.oncontextmenu = () => false;

    let dragging: MatterNamespace.Body | null = null;
    let originalInertia: number | null = null;

    Matter.Events.on(mouseConstraint, "startdrag", (event) => {
      dragging = (event as unknown as { body: MatterNamespace.Body }).body;
      if (!dragging) return;
      originalInertia = dragging.inertia;
      Matter.Body.setInertia(dragging, Infinity);
      Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(dragging, 0);
    });

    Matter.Events.on(mouseConstraint, "enddrag", () => {
      if (!dragging) return;
      Matter.Body.setInertia(dragging, originalInertia || 1);
      dragging = null;
      originalInertia = null;
    });

    // Keep the dragged body inside the container and its speed sane.
    Matter.Events.on(engine, "beforeUpdate", () => {
      if (!dragging) return;
      const found = bodies.find((entry) => entry.body === dragging);
      if (!found) return;
      Matter.Body.setPosition(dragging, {
        x: clamp(dragging.position.x, found.width / 2, containerRect.width - found.width / 2),
        y: clamp(dragging.position.y, found.height / 2, containerRect.height - found.height / 2),
      });
      Matter.Body.setVelocity(dragging, {
        x: clamp(dragging.velocity.x, -20, 20),
        y: clamp(dragging.velocity.y, -20, 20),
      });
    });

    releaseDrag = () => {
      mouseConstraint.constraint.bodyB = null;
      // Matter clears the anchor with null; the typings only allow a Vector.
      mouseConstraint.constraint.pointB = null as unknown as MatterNamespace.Vector;
    };
    container.addEventListener("mouseleave", releaseDrag);
    container.addEventListener("mouseup", releaseDrag);
    Matter.World.add(engine.world, mouseConstraint);

    detachMouse = () => {
      mouse.element.removeEventListener("mousemove", mouse.mousemove);
      mouse.element.removeEventListener("mousedown", mouse.mousedown);
      mouse.element.removeEventListener("mouseup", mouse.mouseup);
    };
  }

  const runner = Matter.Runner.create();
  Matter.Runner.run(runner, engine);

  let frame = 0;
  const updatePositions = () => {
    bodies.forEach(({ body, element, width, height }) => {
      const x = clamp(body.position.x - width / 2, 0, containerRect.width - width);
      const y = clamp(body.position.y - height / 2, -height * 3, containerRect.height - height);
      // Transform only: animating left/top would force a layout every frame.
      element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
    });
    frame = window.requestAnimationFrame(updatePositions);
  };
  updatePositions();
  container.classList.add("is-ready");

  return {
    // Paused whenever the section is off-screen, so the physics and the render
    // loop cost nothing while the rest of the page is being scrolled.
    setActive(active: boolean) {
      runner.enabled = active;
      if (active && !frame) {
        frame = window.requestAnimationFrame(updatePositions);
      } else if (!active && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    destroy() {
      window.clearTimeout(topWallTimer);
      window.cancelAnimationFrame(frame);
      if (releaseDrag) {
        container.removeEventListener("mouseleave", releaseDrag);
        container.removeEventListener("mouseup", releaseDrag);
      }
      detachMouse?.();
      Matter.Runner.stop(runner);
      Matter.Events.off(engine, "beforeUpdate");
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      container.classList.remove("is-ready");
      elements.forEach((element) => {
        element.style.transform = "";
      });
    },
  };
}

export default function GravityCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [staticLayout, setStaticLayout] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let handle: PhysicsHandle | null = null;
    let matter: Matter | null = null;
    let resizeTimer = 0;
    let lastWidth = container.getBoundingClientRect().width;

    const stop = () => {
      handle?.destroy();
      handle = null;
    };

    const start = async () => {
      if (disposed || handle || reducedMotion.matches) return;
      matter ??= (await import("matter-js")).default;
      if (disposed || handle || reducedMotion.matches) return;
      handle = initPhysics(matter, container);
    };

    // Starts the physics the first time the section enters the viewport, then
    // keeps watching so it can idle while the section is scrolled past.
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible && !handle) void start();
      else handle?.setActive(visible);
    });

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const width = container.getBoundingClientRect().width;
        // Ignore height-only resizes: mobile browsers fire those while scrolling.
        if (width === lastWidth) return;
        lastWidth = width;
        if (!handle) return;
        stop();
        void start();
      }, 250);
    };

    const onMotionPreferenceChange = () => {
      setStaticLayout(reducedMotion.matches);
      if (reducedMotion.matches) stop();
      else void start();
    };

    setStaticLayout(reducedMotion.matches);
    if (!reducedMotion.matches) observer.observe(section);
    window.addEventListener("resize", onResize);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      disposed = true;
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      stop();
    };
  }, []);

  return (
    <section
      className={`gravity-cta${staticLayout ? " gravity-cta--static" : ""}`}
      id="movement"
      ref={sectionRef}
      aria-labelledby="gravity-cta-heading"
    >
      <div className="gravity-cta__wrap">
        <div className="gravity-cta__objects" ref={containerRef} aria-hidden="true">
          {objects.map((object) =>
            object.type === "image" ? (
              <div className="gravity-cta__object gravity-cta__object--image" key={object.src}>
                <Image
                  src={object.src}
                  alt=""
                  fill
                  draggable={false}
                  sizes="(max-width: 767px) 72px, (max-width: 1199px) 118px, 140px"
                />
              </div>
            ) : (
              <div className="gravity-cta__object gravity-cta__object--word" key={object.label}>
                <p>{object.label}</p>
              </div>
            ),
          )}
        </div>

        <div className="gravity-cta__content">
          <div className="gravity-cta__btngroup">
            <a className="primary-cta split-hover-cta" href="#contact">
              <span>Termin vereinbaren</span>
            </a>
          </div>
          <div className="gravity-cta__caption">
            <p>Über uns – seit {business.foundedYear} in Berlin</p>
            <h2 id="gravity-cta-heading">
              Über {business.experienceYears} Jahre Erfahrung mit Haushaltsgeräten.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
