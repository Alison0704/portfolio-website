export default function Experience() {
  return (
    <section id="experience" className="section-block">
      <p className="section-kicker">Experience</p>

      <h2>Experience & Focus Areas</h2>

      <div className="timeline mt-4">
        <div className="timeline-item">
          <span>01</span>
          <div>
            <h3>ASIC / EDA Exploration</h3>
            <p>
              OpenLane, OpenROAD, Magic VLSI, Xschem, Ngspice, KLayout, Netgen,
              and Sky130A-based design flows.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <span>02</span>
          <div>
            <h3>Robotics Systems</h3>
            <p>
              ROS 2 architecture, perception, state machines, path planning,
              motor control, and embedded integration.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <span>03</span>
          <div>
            <h3>Software Tooling</h3>
            <p>
              Python and web-based tools for simulation, automation, design
              assistance, and engineering workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
