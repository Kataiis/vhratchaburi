"use client"
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter, } from "next/navigation";
// import { usePatientStore } from "../store";
import Swal from "sweetalert2";
import liff from "@line/liff"
import GetOS from "@line/liff/get-os";
import dayjs from "dayjs";
import Image from 'next/image'
import refresh from '@/public/refresh.png'
import medicalhistory from '@/public/medical-history.gif'
import loadingpage from '@/public/loading.png'


const Hospitalbook = () => {
    const router = useRouter();
    const pathUrl: any = process.env.pathUrl;
    const vhratchaburiliff: any = process.env.vhratchaburiliff;
    const [data, setData] = useState([]);
    const [loading, setloading] = useState(true);


    // const Patient: any = usePatientStore((state: any) => state.patient);

    const [checkuser, setCheckuser] = useState(false);
    const [user, setUser] = useState<any>([]);


    // const updatePatient: any = usePatientStore((state: any) => state.updatePatient);
    const [os, setOs] = useState<string>();
    const [lineId, setLineId] = useState("");
    const [profile, setProfile] = useState<any>({});


    const updatedata = async (Patient: any, lineid: any) => {
        const mytimestamp: any = dayjs().format("YYYY-MM-DD HH:mm:ss");
        const dataIns = {
            req_cid: Patient?.cid,
            favhos1: Patient?.favhos1,
            line_id: lineid,
        };

        const dataservice = {
            cid: Patient.cid,
            lineid: lineid,
            hospcode: 10678,
        }

        console.log("dataIns", dataIns)

        const check = await axios.post(`${pathUrl}/health/hyggelineservice/checkLineid`, { lineid: lineid })
        if (check.data.length > 1) {
            const resIns: any = await axios.post(pathUrl + "/health/hiereq/store_hyggeoa", dataIns);
            console.log("resIns", resIns.data)

            if (resIns.data.ok) {
                console.log("insert hie_request success");
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
                                timer: 1500
                            })
                                .then(async () => {

                                    router.replace('https://modern-wolves-hope.loca.lt/profile2/' + Patient?.cid + "/" + Patient.token_line)
                                });
                        }, 30000);
                        return () => clearTimeout(timer);
                    } else {
                        console.log("have  log in hie_request");
                        Swal.fire({
                            title: "ข้อมูลเป็นปัจจุบันแล้ว",
                            icon: "success",
                            allowOutsideClick: false,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        router.replace('https://modern-wolves-hope.loca.lt/profile2/' + Patient?.cid + "/" + Patient.token_line)
                    }
                } else { throw new Error(res.data.error) }
            } else { throw new Error(resIns.data.error) }
        } else { throw new Error(check.data.error); }




    };

    const initLiff = async () => {
        liff.use(new GetOS());
        setOs(liff.getOS());
        await liff.init({ liffId: vhratchaburiliff }).then(async () => {
            if (!liff.isLoggedIn()) {
                liff.login();
            } else {
                const profile = await liff.getProfile()
                console.log(profile);
                // console.log("profile?.userId", profile?.userId);
                setProfile(profile)
                setLineId(profile?.userId);
                console.warn(lineId);
                const dataSend = { token_line: `${profile.userId}` }

                //     const checkLineId = await axios.post(`${pathUrl}/health/hygge_citizen/checkbytoken`, dataSend)
                //     console.info(checkLineId.data);
                //     console.log("checkLineId", checkLineId.data)

                //     if (checkLineId.data.ok) {
                //         if (checkLineId.data.message.length > 0) {
                //             console.log("cid : ", checkLineId.data.message[0].cid);
                //             setCheckuser(true);
                //             setUser(checkLineId.data[0]);
                //             console.log(checkLineId);
                //             const value = checkLineId.data.message[0].cid;
                //             // ดึงข้อมูลจาก API
                //             const res2 = await axios.post(`${pathUrl}/health/hygge_citizen/bycid`, { cid: value })
                //             console.log("res2.data : ", res2.data);
                //             if (res2.data.ok) {
                //                 if (res2.data.message.length != 0) {
                //                     // updatePatient(res2.data.message[0])
                //                     const Patient = res2.data.message[0]

                //                     const log = await axios.post(`${pathUrl}/health/phrviewlog/ins`, { cid: value, line_id: `${profile.userId}` })
                //                     console.log("log", log.data)
                //                     const mytimestamp: any = dayjs().format("YYYY-MM-DD HH:mm:ss");

                //                     if (log.data.ok) {
                //                         updatedata(Patient, `${profile.userId}`)
                //                     } else {
                //                         throw new Error(log.data.error);
                //                     }


                //                 } else {
                //                     throw new Error(res2.data.error);
                //                 }
                //             }
                //         } else {
                //             router.replace("/login");
                //         }


                //     } else {

                //         throw new Error(checkLineId.data.error);
                //     }
                // }
                const checkLineId = await axios.post(`${pathUrl}/health/hyggelineservice/checkLineid`, dataSend)
                // console.info(checkLineId.data);
                console.log("checkLineId", checkLineId.data)

                if (checkLineId.data.ok) {
                    if (checkLineId.data.message.length > 0) {
                        console.log("cid : ", checkLineId.data.message[0].cid);
                        setCheckuser(true);
                        setUser(checkLineId.data[0]);

                        console.log(checkLineId);
                        const value = checkLineId.data.message[0].cid;
                        // ดึงข้อมูลจาก API
                        const res2 = await axios.post(`${pathUrl}/health/hygge_citizen/bycid`, { cid: value })
                        console.log("res2.data : ", res2.data);
                        if (res2.data.ok) {
                            if (res2.data.message.length != 0) {
                                // updatePatient(res2.data.message[0])
                                const Patient = res2.data.message[0]

                                const log = await axios.post(`${pathUrl}/health/phrviewlog/ins`, { cid: value, line_id: `${profile.userId}` })
                                console.log("log", log.data)
                                const mytimestamp: any = dayjs().format("YYYY-MM-DD HH:mm:ss");

                                if (log.data.ok) {
                                    updatedata(Patient, `${profile.userId}`)
                                    router.replace('https://modern-wolves-hope.loca.lt/profile2/' + Patient?.cid + "/" + Patient.token_line)

                                } else {
                                    throw new Error(log.data.error);
                                }


                            } else {
                                throw new Error(res2.data.error);
                            }
                        }
                    } else {
                        router.replace("/login");
                    }


                } else {

                    throw new Error(checkLineId.data.error);
                }
            }

        });
        await liff.ready
    }




    useEffect(() => {
        try {
            initLiff()
        } catch (e: any) {
            console.error('liff init error', e.message)
        }

    }, []);

    return (

        <div>
            {loading && (

                <div><div className="flex justify-center items-center w-full mt-20">

                    <div className="animate-pulse flex space-x-4  justify-center items-center">
                        <Image
                            priority
                            src={loadingpage}

                            alt="loading"
                            width={100}
                            height={100} />

                    </div>

                </div>
                    <div className="flex justify-center mt-4 text-[#65B16D]">
                        <p className="text-center font-semibold	">กำลังดึงข้อมูลจากโรงพยาบาล <br />กรุณารอประมาณ 30 วินาที</p>
                    </div>
                </div>



            )}


        </div>


    )
}

export default Hospitalbook;

