# คู่มือติดตั้งและใช้งาน (React/Vite + FastAPI + GeoServer)

ระบบแบ่งเป็น 3 ส่วน: React/Vite สำหรับหน้าเว็บ, FastAPI สำหรับคำนวณ AHP/WLC,
และ GeoServer สำหรับเผยแพร่ชั้นข้อมูล WMS (เลือกเปิดใช้ได้)

```
  [ หน้าเว็บ ]            [ Python Backend ]          [ GeoServer ]
  React + Vite      →    FastAPI + rasterio    →     เผยแพร่ WMS
  Build เป็น static      คำนวณ AHP + WLC              (สไตล์ SLD)
       ↑                   เขียนไฟล์ .tif                   │
       └───────────────── โหลดแผนที่ผลลัพธ์กลับมา ────────────┘
```

**ระบบทำงานได้แม้ยังไม่ได้ติดตั้ง GeoServer** — จะใช้โหมดภาพ PNG ไปก่อน
พอเปิด GeoServer แล้วค่อยสลับเป็น WMS อัตโนมัติ ไม่ต้องแก้โค้ด

---

## รันในเครื่องเพื่อพัฒนา

ต้องมี Node.js/npm และ Python ติดตั้งในเครื่อง เปิด terminal แยกกัน 2 หน้าต่าง

### 1. รัน FastAPI backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

API ทดสอบได้ที่ `http://127.0.0.1:8000/api/factors`

### 2. รัน React/Vite frontend

จากโฟลเดอร์หลักของโปรเจกต์:

```bash
npm install
npm run dev
```

เปิด URL ที่ Vite แสดงใน terminal (ปกติคือ `http://localhost:5173`).
ระหว่างพัฒนา frontend จะเชื่อม backend ที่ `http://127.0.0.1:8000` อัตโนมัติ
หากใช้ API URL อื่น ให้คัดลอก `.env.example` เป็น `.env.local` แล้วแก้ `VITE_API_URL`.

### Build frontend

```bash
npm run build
```

ไฟล์สำหรับ deploy จะอยู่ใน `dist/`.

## Deploy บน Render

`render.yaml` ตั้งค่า Static Site สำหรับ React/Vite และกำหนด `VITE_API_URL` ให้ชี้ไปยัง
FastAPI service ปัจจุบันที่ `https://webwijai-ahp.onrender.com`. เชื่อม repository กับ Render
แล้วสร้าง Blueprint จากไฟล์นี้เพื่อ deploy frontend; เส้นทาง `/app` และ `/about` จะเปิดผ่าน React
และรองรับการ refresh หน้าโดยตรง.

FastAPI backend ยังคงเป็น service แยกบน Render. หากสร้าง backend service ใหม่ ให้ตั้ง
Root Directory เป็น `backend`, Build Command เป็น `pip install -r requirements.txt`,
และ Start Command เป็น `uvicorn main:app --host 0.0.0.0 --port $PORT`; จากนั้นตั้ง `VITE_API_URL`
ของ Static Site ให้เป็น URL ของ service นั้น.

---

## ติดตั้ง GeoServer (ทำเมื่อพร้อม)

### 3.1 ติดตั้ง

1. ติดตั้ง **Java JDK 11 ขึ้นไป** ก่อน — ดาวน์โหลดจาก https://adoptium.net
2. ดาวน์โหลด GeoServer จาก https://geoserver.org/download/
   เลือก **Platform Independent Binary** (หรือตัวติดตั้ง Windows ก็ได้)
3. แตกไฟล์ แล้วรัน `bin\startup.bat` (Windows) — ปล่อยหน้าต่างนี้เปิดทิ้งไว้
4. เข้า `http://localhost:8080/geoserver` → ล็อกอินด้วย `admin` / `geoserver`

> ถ้ามี service อื่นใช้พอร์ต 8080 อยู่ ให้เปลี่ยนพอร์ตของ GeoServer
> เพื่อไม่ให้ชนกัน

### 3.2 เปิดใช้งานฝั่ง Python

**ไม่ต้องสร้าง workspace / store / style เองใน GeoServer**
ระบบจะสร้างให้อัตโนมัติผ่าน REST API ตอนกดคำนวณครั้งแรก

ปิด uvicorn เดิม แล้วรันใหม่พร้อมตั้งค่า:

**Windows (PowerShell)**
```powershell
cd backend
$env:GEOSERVER_ENABLED="true"
$env:GEOSERVER_URL="http://localhost:8080/geoserver"
$env:GEOSERVER_USER="admin"
$env:GEOSERVER_PASS="geoserver"
python -m uvicorn main:app --reload --port 8000
```

**Windows (Command Prompt)**
```cmd
cd backend
set GEOSERVER_ENABLED=true
set GEOSERVER_URL=http://localhost:8080/geoserver
set GEOSERVER_USER=admin
set GEOSERVER_PASS=geoserver
python -m uvicorn main:app --reload --port 8000
```

**macOS / Linux**
```bash
cd backend
export GEOSERVER_ENABLED=true
python -m uvicorn main:app --reload --port 8000
```

ดูตัวเลือกทั้งหมดได้ที่ `backend/.env.example`

### 3.3 ตรวจสอบว่าเชื่อมต่อได้

เปิด `http://127.0.0.1:8000/api/geoserver-status`

| ข้อความที่เห็น | แปลว่า |
|---|---|
| `เชื่อมต่อ GeoServer สำเร็จ` | พร้อมใช้งาน |
| `ปิดการใช้งาน GeoServer อยู่` | ยังไม่ได้ตั้ง `GEOSERVER_ENABLED=true` |
| `เชื่อมต่อ ... ไม่ได้` | ยังไม่ได้เปิด GeoServer หรือพอร์ตไม่ตรง |
| `user/password ไม่ถูกต้อง` | รหัสผ่านถูกเปลี่ยนไปแล้ว |

---

## ระบบทำอะไรให้บ้างตอนกด "คำนวณแผนที่"

1. คำนวณ WLC จากน้ำหนัก AHP (`S = Σ wi·xi` ตามหัวข้อ 2.4 ของเล่ม)
2. จำแนกเป็น 4 ระดับตามมาตรฐาน FAO แล้วเขียนเป็นไฟล์
   `backend/output/suitability_result.tif` (EPSG:4326, ค่า 1=N, 2=S3, 3=S2, 4=S1,
   0=นอกเขตจังหวัด)
3. สั่ง GeoServer สร้าง workspace `sugarcane` + สไตล์ SLD + publish เลเยอร์
4. ล้าง cache ของ GeoWebCache ไม่ให้ค้างภาพเก่า
5. หน้าเว็บโหลดเลเยอร์ WMS มาแสดง

**ถ้าขั้นที่ 3 ไม่สำเร็จ ระบบจะไม่ error** — จะแสดงภาพ PNG แทน พร้อมข้อความ
บอกสาเหตุมุมขวาบนของหน้าเว็บ

### เปิดดูเลเยอร์ใน QGIS / ArcMap ด้วยก็ได้

นี่คือข้อดีของการใช้ GeoServer — เปิดจากโปรแกรม GIS อื่นได้ด้วย URL เดียว:

```
http://localhost:8080/geoserver/sugarcane/wms
```
(QGIS: Layer → Add Layer → Add WMS/WMTS Layer → New → วาง URL ด้านบน)

---

## ปัญหาที่พบบ่อย

| อาการ | วิธีแก้ |
|---|---|
| หน้าเว็บขึ้น "ไม่สามารถเชื่อมต่อกับ Python Backend ได้" | หน้าต่าง uvicorn ถูกปิดไป ให้เปิดใหม่ตามขั้นที่ 1 |
| แผนที่ไม่อัปเดตหลังกดคำนวณ | ล้าง cache: GeoServer → Tile Caching → Tile Layers → Empty |
| `publish ไม่สำเร็จ (HTTP 500)` | ตรวจว่า GeoServer อ่านพาธไฟล์ `.tif` ได้ (ถ้าคนละเครื่อง ต้องตั้ง `GEOSERVER_DATA_DIR` เป็นพาธบนเครื่อง GeoServer) |
| เลเยอร์ขึ้นเป็นสีเทาทึบ | สไตล์ยังไม่ถูกผูก — เข้า GeoServer → Layers → เลือกเลเยอร์ → tab Publishing → Default Style = `suitability_fao` |
