export default function About() {
  return (
    <div className="section-block">
      <p className="section-kicker">About</p>

      <h2>Engineering at the hardware/software boundary.</h2>

      <p>
        I work on systems that combine digital logic, software, embedded
        control, and physical hardware. My interests include RTL design,
        verification, ASIC/EDA workflows, robotics, computer vision, and
        high-performance software.
      </p>

      <div className="row mt-4 g-4">
        <div className="col-md-4">
          <div className="info-card">
            <i className="fa-solid fa-code"></i>
            <h3>Software</h3>
            <p>Python, C++, React, automation, tooling, and simulation.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="info-card">
            <i className="fa-solid fa-microchip"></i>
            <h3>Hardware</h3>
            <p>RTL, SystemVerilog, ASIC flow, PCB basics, and EDA tools.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="info-card">
            <i className="fa-solid fa-robot"></i>
            <h3>Robotics</h3>
            <p>ROS 2, navigation, perception, motor control, and simulation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
