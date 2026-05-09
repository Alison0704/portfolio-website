export default function Hero() {
  return (
    <div className="container hero-content">
      <div className="row align-items-center justify-content-between g-5">
        <div className="col-lg-7">
          <p className="section-kicker">Portfolio System Online</p>

          <h1 className="display-3 fw-bold">
            Hi, I&apos;m <span className="text-sky">AliEmi</span>
          </h1>

          <p className="lead mt-3">
            BASc Electrical Engineering and BSc Computing Technology Graduate
            Student focused on ASIC/FPGA verification, RTL design, and
            hardware/software systems.
          </p>

          <div className="d-flex flex-wrap gap-3 mt-4">
            <a
              href="/resume/Alison_Emilien_Resume_Hardware.pdf"
              className="btn btn-outline-sky"
              target="_blank"
              rel="noreferrer"
            >
              Hardware Focused Resume
            </a>

            <a
              href="/resume/Alison_Emilien_Resume_Software.pdf"
              className="btn btn-outline-sky"
              target="_blank"
              rel="noreferrer"
            >
              Software Focused Resume
            </a>
          </div>
        </div>

        <div className="col-lg-5 d-flex align-items-center justify-content-center">
          <img src="/Logo.png" alt="AliEmi logo" className="profile-image" />
        </div>
      </div>
    </div>
  );
}
