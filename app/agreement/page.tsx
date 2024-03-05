"use client"
import React, { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import hygge_logo from '@/public/hygge_logo.png'
import pix from '@/public/pix.png'
import { useRouter } from "next/navigation";
import backpage from '@/public/back.png'
import { usePatientStore, uselineStore } from "../store";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";
import digital from "@/public/digital.png"

function Agreement() {
    const router = useRouter();
    const pathUrl: any = process.env.pathUrl;
    const Patient: any = usePatientStore((state: any) => state.patient);
    // const updateline: any = uselineStore((state: any) => state.linezod);
    const lineID: any = uselineStore((state: any) => state.linezod);

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [patient, setPatient] = useState<any>([]);


    const updatedata = async () => {

        setIsSubscribed(false);
        const mytimestamp: any = dayjs().format("YYYY-MM-DD HH:mm:ss");
        console.log("lineID", lineID)
        const res: any = await axios.post(pathUrl + "/health/hiereq/checkin", { cid: Patient?.cid, });
   

        if (res.data.ok) {
            if (res.data.message <= 1) {

                Swal.fire({
                    html:
                        '<div><img src="/health-report.gif" />' +
                        '<p style="font-size: 16px; margin-top: 10px">กำลังดึงข้อมูลจากโรงพยาบาล</p>' +
                        '<p style="font-size: 18px; margin-top: 10px">กรุณารอประมาณ 30 วินาที</p>' +
                        '</div>',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                });

                const text = "REQUEST|" + Patient.favhos1 + "|" + Patient?.cid + "|" + mytimestamp
                console.log("text", text)
                // //ไม่เคยมีการ request วันนี้

                const sentmqtt = await axios.post(`https://hyggemedicalservice.com/apirbh/connectmqtt/hyggeoa`, { messagemqtt: text })

                const timer = setTimeout(() => {
                    // ทำ sweetaler แจ้งเตือน ว่าทำสำเร็จแล้ว
                    Swal.fire({
                        title: "อัพเดทข้อมูลสำเร็จ",
                        icon: "success",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                     
                        // router.replace("https://dry-paws-film.loca.lt/profile2/" + Patient?.cid + "/" + updateline.lineid)
                        router.replace("https://hyggeoa.hyggecode.com/profile2/" + Patient?.cid + "/" + lineID)
                        // router.replace('/profile')
                    });

                }, 30000);
                return () => clearTimeout(timer);
            } else {
                console.log("have  log in hie_request");
                Swal.close();
                // Swal.fire({
                //     title: "ข้อมูลเป็นปัจจุบันแล้ว",
                //     icon: "success",
                //     allowOutsideClick: false,
                //     showConfirmButton: false,
                //     timer: 2000
                // });
            
                router.replace("https://hyggeoa.hyggecode.com/profile2/" + Patient?.cid + "/" + lineID)
            }
        }
    };

    const handleChange = (e: any) => {
        if (e.target.checked) {
            console.log('✅ Checkbox is checked');

        } else {
            console.log('⛔️ Checkbox is NOT checked');
        }
        setIsSubscribed(current => !current);
    };


    useEffect(() => {
        
        const getPatient = async () => {
            const res: any = await axios.post(`${pathUrl}/health/hygge_citizen/bycid`,
                { cid: Patient.cid }).then((v: any) => setPatient(v.data.message[0]));
        }
        getPatient();
    }, [])


    return (

        <div>
            <div className="absolute left-8 top-5 h-16 w-16 z-0 ">
                {/* <Image
                    priority
                    src={backpage}
                    alt="scan"
                    height={25}
                    onClick={backPage}
                /> */}
            </div>
            <div className='flex justify-center mt-12'>
                <Image
                    priority
                    src={digital}
                    alt="digital"
                    width={100}
                    height={100}

                />

            </div>
            <div className="-mt-12 p-10 text-center">
                <p className=" text-md mt-10 font-semibold ">ข้อตกลงให้ความยินยอม</p>
                <p className=''>เพื่อเปิดเผยข้อมูลด้านสุขภาพของบุคคลทางอิเล็กทรอนิกส์</p>
                <p className=' mt-2 font-semibold'> ข้าพเจ้า {Patient?.pname} {Patient?.fname} {Patient?.lname}
                </p>
                <p className=''>เลขประจำตัวประชาชน</p>
                <p className='font-semibold'>{Patient?.cid}</p>

            </div>
            <div className="-mt-20 p-10 ">
                <p className='mt-2 '>1. ยินยอมให้สถานพยาบาลเปิดเผยข้อมูล /ส่งต่อข้อมูลทางอิเล็กทรอนิกส์ เพื่อประโยชน์ต่อการรักษาพยาบาลแก่ตัวข้าพเจ้าเอง และเจ้าหน้าที่ผู้ประกอบวิชาชีพด้านสาธารณสุขที่ได้รับอนุญาตในการรักษาพยาบาล</p>
                <p className='mt-2 '>2. ยินยอมแลกเปลี่ยนข้อมูลระหว่างสถานพยาบาลโดยสามารถนำข้อมูลระดับบุคคลไปใช้ประโยชน์ในการบริการดูแลสุขภาพ</p>
                <p className='mt-2'>3. ข้าพเจ้าสามารถยกเลิกความยินยอมได้ แต่ไม่มีผลลบล้างความยินยอม และผลแห่งความยินยอมซึ่งได้กระทำไปแล้วก่อนหน้านั้น</p>

            </div>

            <div className="text-center">
                <input
                    type="checkbox"
                    onChange={handleChange}
                    id="subscribe"
                    name="subscribe"
                />
                <span className="ml-5">ข้าพเจ้าให้การยอมรับข้อตกลง</span>



                <br />
                <Button disabled={!isSubscribed}
                    className="bg-[#00AE91] text-[#ffffff] border border-[#ffffff] 
                    text-xl h-[58px] w-[178px] rounded-lg shadow-md shadow-gray-500/100  hover:bg-[#eaefe8] disabled:bg-gray-500 disabled:text-[#ffffff]
                      hover:text-[#00AE91] hover:text-xl mt-5"
                    type="submit"
                    onClick={() => updatedata()}> ตกลง </Button>



            </div>
            <br />

        </div>

    )
}

export default Agreement