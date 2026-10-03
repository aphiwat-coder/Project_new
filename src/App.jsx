import { useEffect, useState } from "react";

const guideSteps = [
  <><h4>นำเข้าข้อมูลแผนที่ (Upload)</h4><p>ไปที่เมนูขวามือ คลิกที่ไอคอน <span className="icon-demo">📎</span> เพื่ออัปโหลดไฟล์ (รองรับไฟล์ <b>.tif</b> หรือไฟล์ Shapefile ที่ต้องบีบอัดเป็น <b>.zip</b> ก่อนอัปโหลด)</p></>,
  <><h4>กำหนดเกณฑ์คะแนน (Classify)</h4><p>หลังจากระบบประมวลผลไฟล์เสร็จสิ้น ให้คลิกไอคอน <span className="icon-demo">🎯</span> เพื่อกำหนดช่วงข้อมูลและระบุคะแนน (เช่น ห่างแหล่งน้ำ 0-1 กม. ให้ 10 คะแนน)</p></>,
  <><h4>เปรียบเทียบปัจจัย (AHP Matrix)</h4><p>คลิกปุ่ม <b>"สร้าง Matrix"</b> เพื่อเปิดตารางเปรียบเทียบค่าน้ำหนักความสำคัญรายคู่ เมื่อกรอกเสร็จให้คลิก <b>"1. คำนวณน้ำหนัก"</b></p></>,
  <><h4>ประมวลผลแผนที่ (Overlay)</h4><p>คลิกปุ่ม <b>"2. คำนวณแผนที่"</b> ระบบจะวิเคราะห์ข้อมูลทั้งหมดและแสดงพื้นที่เหมาะสมที่สุดบนแผนที่</p></>,
  <><h4>ดาวน์โหลดผลลัพธ์ (Download)</h4><p>เลือกนามสกุลไฟล์ที่ต้องการในกล่องดาวน์โหลดด้านล่าง (เช่น Shapefile, GeoJSON) แล้วนำไปใช้งานต่อในโปรแกรม GIS ได้ทันที</p></>,
];

function GuideSteps() {
  return guideSteps.map((step, index) => (
    <div className="guide-step" key={index}>
      <div className="step-num">{index + 1}</div>
      <div className="step-content">{step}</div>
    </div>
  ));
}

function Modal({ open, onClose, children, className = "", style = {} }) {
  if (!open) return null;
  return <div className={`modal ${className}`} style={style} onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}>{children}</div>;
}

function LandingPage() {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <div className="hero-section">
      <main className="glass-card">
        <div className="project-badge">วิทยาลัยการคอมพิวเตอร์ ม.ขอนแก่น</div>
        <h1>ระบบสนับสนุนการตัดสินใจบน WebGIS</h1>
        <h2>ประเมินศักยภาพที่ดินเพื่อการปลูกอ้อยโรงงาน จังหวัดขอนแก่น</h2>
        <p className="description">
          บูรณาการกระบวนการวิเคราะห์ลำดับชั้น (AHP) ร่วมกับข้อมูลเชิงพื้นที่ทางกายภาพและระยะทางขนส่ง
          เพื่อช่วยให้เกษตรกรและผู้ประกอบการวางแผนโซนนิ่ง (Zoning) ได้อย่างแม่นยำ
        </p>
        <div className="action-buttons">
          <a href="/app" className="btn btn-primary">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            เข้าสู่ระบบประเมินพื้นที่ (WebGIS)
          </a>
          <button type="button" onClick={() => setGuideOpen(true)} className="btn btn-secondary">📖 คู่มือการใช้งาน</button>
          <a href="/about" className="btn btn-secondary">เกี่ยวกับงานวิจัย</a>
        </div>
        <div className="footer-credit">
          พัฒนาโดย นายศุภวัชร บุปผเวส และ นายอภิวัฒน์ เมืองสนธิ์<br />
          อาจารย์ที่ปรึกษา: อ.ดร.ศรัณย์ อภิชนตระกูล
        </div>
      </main>
      <Modal open={guideOpen} onClose={() => setGuideOpen(false)}>
        <div className="modal-content">
          <button type="button" className="modal-close" onClick={() => setGuideOpen(false)} aria-label="ปิดคู่มือ">&times;</button>
          <h3 className="guide-title">📖 วิธีการใช้งานระบบ (สำหรับผู้เริ่มต้น)</h3>
          <GuideSteps />
        </div>
      </Modal>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="hero-section">
      <main className="glass-card about-card">
        <div className="project-badge">วิทยาลัยการคอมพิวเตอร์ ม.ขอนแก่น</div>
        <h1>ระบบสนับสนุนการตัดสินใจบน WebGIS ร่วมกับเทคนิค AHP</h1>
        <h2>สำหรับการประเมินศักยภาพที่ดินเพื่อการปลูกอ้อย ในพื้นที่จังหวัดขอนแก่น</h2>
        <p>
          งานวิจัยนี้พัฒนาระบบสนับสนุนการตัดสินใจเชิงพื้นที่บนเครือข่าย (WebGIS)
          สำหรับประเมินศักยภาพที่ดินในการปลูกอ้อยโรงงานในพื้นที่จังหวัดขอนแก่น
          โดยบูรณาการกระบวนการวิเคราะห์ลำดับชั้น (Analytic Hierarchy Process: AHP)
          เข้ากับปัจจัยด้านกายภาพ ดิน ภูมิอากาศ และระยะทางขนส่ง เพื่อแก้ปัญหา
          ต้นทุนโลจิสติกส์และการปลูกอ้อยในพื้นที่ที่ไม่เหมาะสม
        </p>
        <h3>ปัจจัยที่ใช้ในการวิเคราะห์ (6 ปัจจัย)</h3>
        <table className="factor-table">
          <tbody>
            <tr><th>ปัจจัย</th><th>น้ำหนัก AHP</th></tr>
            <tr><td>ปริมาณน้ำฝน</td><td>33.6%</td></tr>
            <tr><td>แหล่งน้ำ</td><td>30.9%</td></tr>
            <tr><td>ประเภทดิน</td><td>20.5%</td></tr>
            <tr><td>การคมนาคม</td><td>6.5%</td></tr>
            <tr><td>พื้นที่น้ำท่วม</td><td>4.4%</td></tr>
            <tr><td>พื้นที่เสี่ยงภัยแล้ง</td><td>4.0%</td></tr>
          </tbody>
        </table>
        <p className="about-note">
          (น้ำหนักข้างต้นคำนวณจากกระบวนการ AHP ผ่านการตรวจสอบ Consistency Ratio
          CR = 0.086 ซึ่งน้อยกว่าเกณฑ์มาตรฐาน 0.10 — ผู้ใช้สามารถปรับเปลี่ยนค่า
          เปรียบเทียบรายคู่เองในหน้าระบบเพื่อคำนวณน้ำหนักใหม่ได้)
        </p>
        <h3>วิธีการวิเคราะห์</h3>
        <p>
          ใช้เทคนิค Weighted Linear Combination (WLC) นำคะแนนความเหมาะสมของแต่ละ
          ปัจจัย (ที่ผ่านการจัดกลุ่มคะแนนตามมาตรฐาน FAO และกรมพัฒนาที่ดิน) มาคูณ
          กับน้ำหนักจาก AHP แล้วรวมกันเป็นคะแนนความเหมาะสมโดยรวมของพื้นที่
        </p>
        <h3>คณะผู้จัดทำ</h3>
        <ul>
          <li>นายศุภวัชร บุปผเวส — รหัสนักศึกษา 663380329-7</li>
          <li>นายอภิวัฒน์ เมืองสนธิ์ — รหัสนักศึกษา 663380332-8</li>
        </ul>
        <p>อาจารย์ที่ปรึกษา: อ.ดร.ศรัณย์ อภิชนตระกูล</p>
        <p className="about-footer">
          วิชา CP373 701 ระเบียบวิธีวิจัยทางภูมิสารสนเทศศาสตร์<br />
          สาขาวิชาวิทยาการคอมพิวเตอร์ วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น<br />
          ปีการศึกษา 2568
        </p>
        <a href="/" className="back-link">← กลับหน้าแรก</a>
      </main>
    </div>
  );
}

function AppPage() {
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const scriptElements = [];
    const local = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
    document.documentElement.classList.add("app-layout");
    document.body.classList.add("app-layout");
    window.WEBGIS_BACKEND_URL = import.meta.env.VITE_API_URL?.trim()
      || (local ? "http://127.0.0.1:8000" : "https://webwijai-ahp.onrender.com");

    const loadScripts = async () => {
      for (const src of ["/legacy/js/matrix.js", "/legacy/js/classify.js", "/legacy/js/map.js", "/legacy/js/app.js"]) {
        if (cancelled) return;
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = false;
          script.onload = resolve;
          script.onerror = () => reject(new Error(`โหลดสคริปต์ไม่สำเร็จ: ${src}`));
          scriptElements.push(script);
          document.body.appendChild(script);
        });
      }
    };

    loadScripts().catch((error) => {
      if (!cancelled) window.alert(`เริ่มต้นระบบแผนที่ไม่สำเร็จ: ${error.message}`);
    });

    return () => {
      cancelled = true;
      scriptElements.forEach((script) => script.remove());
      window.map?.remove();
      delete window.map;
      delete window.onSuitabilityMapClick;
      delete window.WEBGIS_BACKEND_URL;
      document.documentElement.classList.remove("app-layout");
      document.body.classList.remove("app-layout");
    };
  }, []);

  return (
    <>
      <div id="toastContainer" className="toast-container" />
      <header className="top-navbar">
        <div className="nav-left">
          <div className="nav-title">
            <h1>ระบบสนับสนุนการตัดสินใจบน WebGIS</h1>
            <span>ประเมินศักยภาพที่ดินเพื่อการปลูกอ้อยโรงงาน จังหวัดขอนแก่น</span>
          </div>
        </div>
        <div className="nav-right">
          <button type="button" onClick={() => setGuideOpen(true)} className="nav-guide-btn">📖 คู่มือการใช้งาน</button>
          <a href="/" className="nav-back">← กลับหน้าแรก</a>
        </div>
      </header>

      <div className="app-container">
        <main className="map-area">
          <div className="map-wrapper"><div id="map" /></div>
        </main>
        <aside className="sidebar">
          <section className="control-card">
            <h3 className="card-title">ปัจจัย & ชั้นข้อมูล (Layers)</h3>
            <div id="dataReadinessBadge" className="readiness-badge" />
            <div className="add-factor-group">
              <input type="text" id="newCriteriaInput" placeholder="พิมพ์ชื่อปัจจัยเพื่อเพิ่ม" className="input-text" />
              <button id="addCriteria" type="button" className="btn btn-dark-green">เพิ่ม</button>
            </div>
            <div id="criteriaList" className="factor-list" />
          </section>

          <section className="control-card">
            <h3 className="card-title">กระบวนการ AHP</h3>
            <div className="button-grid">
              <button id="createMatrix" type="button" className="btn btn-outline-green">สร้าง Matrix</button>
              <button id="calculate" type="button" className="btn btn-green">1. คำนวณน้ำหนัก</button>
              <button id="calculateSuitability" type="button" className="btn btn-green">2. คำนวณแผนที่</button>
              <button id="reset" type="button" className="btn btn-danger">รีเซ็ตแผนที่</button>
            </div>
            <div id="ahpResultContainer" />
          </section>

          <section className="control-card">
            <h3 className="card-title">ดาวน์โหลดข้อมูล</h3>
            <p className="download-description">เลือกประเภทไฟล์สำหรับดาวน์โหลดข้อมูลผลลัพธ์</p>
            <div className="download-options">
              <button type="button" className="dl-type-btn active" data-type="Shapefile">Shapefile</button>
              <button type="button" className="dl-type-btn" data-type="GeoJSON">GeoJSON</button>
              <button type="button" className="dl-type-btn" data-type="CSV">CSV</button>
              <button type="button" className="dl-type-btn" data-type="KML">KML</button>
            </div>
            <button id="downloadBtn" type="button" className="btn btn-green download-button" disabled>ดาวน์โหลด</button>
          </section>
        </aside>
      </div>

      <Modal open={guideOpen} onClose={() => setGuideOpen(false)}>
        <div className="modal-content app-guide-content">
          <div className="app-guide-heading">
            <h3>📖 วิธีการใช้งานระบบ</h3>
            <button type="button" onClick={() => setGuideOpen(false)} aria-label="ปิดคู่มือ">&times;</button>
          </div>
          <GuideSteps />
        </div>
      </Modal>

      <div id="matrixModal" className="modal" style={{ display: "none" }}>
        <div className="modal-content matrix-modal-content">
          <h3 className="modal-title">Pairwise Comparison Matrix</h3>
          <p className="matrix-description">เปรียบเทียบความสำคัญของปัจจัยเป็นรายคู่ (มีแถบเลื่อนซ้าย-ขวาสำหรับตารางขนาดใหญ่)</p>
          <div id="matrixModalBody" className="matrix-container" />
          <div className="matrix-close-row"><button id="closeMatrixModal" type="button" className="btn btn-dark-green">บันทึกข้อมูลและปิดหน้าต่าง</button></div>
        </div>
      </div>

      <div id="classifyModal" className="modal" style={{ display: "none" }}>
        <div className="modal-content"><h3 id="classifyTitle" className="modal-title">กำหนดเกณฑ์คะแนน</h3><div id="classifyBody" /></div>
      </div>

      <div id="confirmModal" className="modal" style={{ display: "none" }}>
        <div className="modal-content warning-modal">
          <h3 className="modal-title confirm-title">⚠️ ยืนยันการประมวลผล</h3>
          <p className="confirm-description">ปัจจัยต่อไปนี้จะใช้ <b>ข้อมูลจำลอง</b> แทนชั่วคราว:</p>
          <ul id="confirmMissingList" className="confirm-missing-list" />
          <div className="confirm-actions">
            <button id="confirmProceed" type="button" className="btn btn-warning">คำนวณต่อด้วยข้อมูลจำลอง</button>
            <button id="confirmCancel" type="button" className="btn btn-outline">ยกเลิก</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/app") return <AppPage />;
  if (path === "/about") return <AboutPage />;
  return <LandingPage />;
}
