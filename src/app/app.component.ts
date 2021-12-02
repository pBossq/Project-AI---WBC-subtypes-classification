import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'predict white blood cell';
	url: any;
	msg = "";
  image_name = "";
  bloodCellDescription = "หน้าที่ของเม็ดเลือดขาวมีหน้าที่ป้องกันโรคเสริมภูมิคุ้มกันของร่างกาย ทั้งการต่อต้านโรคที่ไม่ใช่การติดเชื้อ เช่นโรคมะเร็ง โรคภูมิแพ้ "+
                         "และการติดเชื้อทั้งเชื้อไวรัส เชื้อรา และเชื้อแบคทีเรีย เม็ดเลือดขาวจะสร้างที่ไขกระดูกและลำเลียงไปสู่ร่างกายทางหลอดน้ำเหลือง "+
                         "และเลือด เม็ดเลือดขาวแต่ละชนิดจะทำหน้าที่ต่างกันออกไปแต่อาจจะทำงานร่วมกัน เช่น เม็ดเลือดชนิด Neutrophils จะทำหน้าที่ต่อต้านเชื้อแบคทีเรีย"+
                         "และทำให้เกิดการอักเสบ Eosinophils จะทำหน้าที่เกี่ยวกับภูมิแพ้ ส่วน Monocytes และ Lymphocytes จะทำหน้าที่เกี่ยวกับภูมิคุ้มกัน";


  eosinophilTitle = "อีโอซิโนฟิล (อังกฤษ: eosinophil)";
  eosinophilDesc =  "Eosinophil (อีโอซิโนฟิล) คือ เซลล์แยกย่อยส่วนน้อยอีกชนิดของเซลล์เม็ดเลือดขาว (WBC) ที่มีประมาณ 1-4% ของ WBC "+
                   "มีหน้าที่สำคัญในการช่วยทำลายสารที่ก่อให้เกิดภูมิแพ้ในร่างกาย โดยช่วยให้ร่างกายอยู่ในสภาวะสมดุล ช่วยให้อาการของภูมิแพ้ลดลงหรือหมดไป"+
                   "เม็ดเลือดขาวชนิดอีโอซิโนฟิล เป็นเม็ดเลือดขาวชนิดที่ถูกสร้างขึ้นเพื่อต่อสู้และป้องกันการติดเชื้อแบคทีเรีย ปรสิต "+
                   "และทำหน้าที่ควบคุมอาการอักเสบที่ทำให้เกิดอาการแพ้และโรคหอบหืด กรณีเม็ดเลือดขาวชนิดอีโอซิโนฟิล หากมีปริมาณสูงอาจเป็นสัญญาณของภูมิแพ้หรือติดเชื้อปรสิตในร่างกาย เช่น พยาธิ อะมีบา เป็นต้น";


  lymphocyteTitle = "ลิมโฟไซต์ (อังกฤษ: lymphocyte)";
  lymphocyteDesc = "Lymphocyte (ลิมโฟไซต์) คือ เซลล์แยกย่อยของเซลล์เม็ดเลือดขาว (WBC) ชนิดหนึ่งที่มีจำนวนเป็น % รองลงมาจากนิวโตรฟิล "+
                   "โดยลิมโฟไซต์จะมีพี่น้องร่วมกำเนิดในสายพันธุ์เดียวกันที่แยกย้ายกันทำหน้าที่ในแต่ละบทบาท คือ T-cells ที่มีหน้าที่ในการทำลายจุลชีพก่อโรคทุกชนิด, "+
                   "B-cells ที่มีหน้าที่ในการสร้างภูมิต้านทานโรคให้แก่ร่างกายโดยตรง, และ Natural Killer cells ที่มีหน้าที่ในการทำลายแบบไม่เลือกทั้งจุลชีพก่อโรคและ"+
                   "บรรดาเซลล์ของร่างกายที่กลายพันธุ์ไปเป็นเซลล์มะเร็ง รวมทั้งเซลล์ที่ดีอื่น ๆ ของร่างกายที่ถูกไวรัสเข้าไปแอบหลบซ่อนอยู่ภายในด้วย"+
                   "เมื่อเม็ดเลือดขาวถูกผลิตออกมาแล้ว 25% ที่เป็นบีเซลล์จะยังอยู่ในไขกระดูก ส่วนเม็ดเลือดขาว 75% จะเข้าสู่ระบบน้ำเหลืองและเลือด "+
                   "จากนั้นก็จะพัฒนาเป็นทีเซลล์ต่อไป โดยเม็ดเลือดขาวชนิดนี้จะทำหน้าที่ในการต่อสู้กับการติดเชื้อ และป้องกันการติดเชื้อในครั้งต่อไป "+
                   "กรณีเม็ดเลือดขาวชนิดลิมโฟไซต์ แสดงให้เห็นถึงสัญญาณของการติดเชื้อไวรัส หรือการก่อตัวของเชื้อมะเร็ง";


  monocyteTitle = "โมโนไซต์ (อังกฤษ: monocyte)";
  monocyteDesc = "Monocyte (โมโนไซต์) คือ เซลล์แยกย่อยอีกชนิดของเซลล์เม็ดเลือดขาว (WBC) มีหน้าที่ในการลาดตระเวนในหลอดเลือด "+
                 "เมื่อได้รับการเตือนภัยจากระบบภูมิคุ้มกัน (มักจะเป็น B-cells) ว่ากำลังมีจุลชีพก่อโรคบุกรุกเข้ามาฝังตัวอยู่ตรงเนื้อเยื่อ ณ บริเวณใดของร่างกาย "+
                 "โมโนไซต์ตัวที่อยู่ภายในหลอดเลือดที่อยู่ใกล้ที่สุดก็จะเข้าไปเขมือบกลืนจุลชีพที่ยังไม่ทันก่อโรค รวมทั้งยังมีหน้าที่เก็บกวาด (เขมือบ) "+
                 "บรรดาเศษชิ้นส่วนหรือซากของจุลชีพก่อโรคที่ถูกฆ่าโดย T-cells หรือ Natural Killer cells ของลิมโฟไซต์ด้วย"+
                 "เม็ดเลือดขาวชนิดโมโนไซต์ (Monocyte) เป็นเม็ดเลือดขาวชนิดที่ทำหน้าที่กำจัดจุลินทรีย์ สิ่งแปลกปลอม และเซลล์ที่ตายแล้ว "+
                 "เม็ดเลือดขาวชนิดโมโนไซต์ พบได้ในโรคติดเชื้ออีบีวี (Epstein-Barr Virus Infection: EBV Intfection) "+
                 "ซึ่งเป็นการติดเชื้อไวรัสที่ไม่มีอาการรุนแรงมากนัก และสามารรถรักษาให้หายได้";


  neutrophilTitle = "นิวโทรฟิล (อังกฤษ: Neutrophil (Neut, PMN, Polys)";
  neutrophilDesc = "Neutrophil (นิวโตรฟิล) หรือ Polymorphonuclear neutrophil (PMN) หรือบางคลินิกก็เรียกว่า Polys ซึ่งย่อมาจาก "+
                   "Polymorphonuclear cells คือ เซลล์แยกย่อยของเซลล์เม็ดเลือดขาว (WBC) ชนิดหนึ่งที่มีจำนวนเป็น % มากที่สุด "+
                   "มีบทบาทหลักในการทำลายเชื้อโรคชนิดแบคทีเรียที่ได้ล่วงล้ำเข้ามาในร่างกายด้วยกระบวนการกลืนกิน neutrophil) "+
                   "เม็ดเลือดขาวชนิดนิวโตรฟิล เป็นชนิดของเม็ดเลือดขาวที่มีมากที่สุดในร่างกาย นอกจากทำหน้าที่ในการป้องกันการติดเชื้อ "+
                   "ไวรัส แบคทีเรีย เชื้อรา พิษจากสารต่าง ๆ ยังทำหน้าที่ต่อสู้กับเซลล์มะเร็ง กรณีเม็ดเลือดขาวชนิดนิวโตรฟิลสูง เป็นสัญญาณของการติดเชื้อแบคทีเรีย";

  private model;
  eosinophil: string;
  lymphocyte: string;
  monocyte: string;
  neutrophil: string;
  maxValue: string = "";
  isShowDescription = false;

  constructor() {}

  public async ngOnInit(): Promise<void> {
    this.loadModel();
  }


  async loadModel(){
    const MODEL_URL = 'assets/model.json';
    this.model = await tf.loadLayersModel(MODEL_URL);
  }

  selectFile(event: any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'กรุณาเลือกรูป';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "เลือกเฉพาะไฟล์รูปภาพเท่านั้น";
			return;
		}

    this.image_name = event.target.files[0].name;


		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
      setTimeout(() => {
        this.predict();
      }, 10);
		}
	}


   predict() {
     try {
        let image = document.getElementById("imagePredict") as HTMLImageElement;
        if(!image) return;
        let imageTensor = tf.image.resizeBilinear(tf.browser.fromPixels(image,3), [320, 240]).expandDims().div(255); // divide
        let prediction = this.model.predict(imageTensor);
        let labels = prediction.dataSync();
        if(labels.length){
          this.eosinophil = (labels[0] * 100.0).toFixed(2) + "%";  // อิโอซิโนฟิลด์
          this.lymphocyte = (labels[1] * 100.0).toFixed(2) + "%";  // ลิมไฟไซท์
          this.monocyte =   (labels[2] * 100.0).toFixed(2) + "%";  // โมโนไซท์
          this.neutrophil = (labels[3] * 100.0).toFixed(2) + "%";  // นิวโตรฟิล
        }
        this.maxValue = Math.max(labels[0] * 100.0,labels[1] * 100.0,labels[2] * 100.0,labels[3] * 100.0).toFixed(2) + "%";
        if(this.maxValue){
          this.isShowDescription = true;
        }
      } catch (error) {
        console.log(error);
      }
  }

}
