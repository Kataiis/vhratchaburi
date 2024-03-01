"use client"
import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import hygge_logo from '@/public/hygge_logo.png'
import pix from '@/public/pix.png'
import { useRouter } from "next/navigation";

import backpage from '@/public/back.png'


function Register() {
    const router = useRouter();

    const back = () => {
        router.replace("/login");
    };


    return (
        <div>
            <div className="absolute left-10 top-6 h-16 w-16 z-0 ">
                <Image
                    priority
                    src={backpage}
                    alt="backpage"
                    height={25}
                    onClick={back}


                />
            </div>
            <div className='bg-[#00AE91]'>
                <p className='text-[#ffffff] text-center text-2xl p-5'>วิธีการลงทะเบียน</p>
            </div>

            <div className='flex justify-center mt-12'>
                <Image
                    priority
                    src={hygge_logo}
                    alt="hygge_logo"
                    width={160}
                    height={140}

                />

            </div>

            <p className=" text-center text-xl mt-10 font-semibold underline">วิธีการลงทะเบียน ขอรหัสผ่าน </p>


            <div className="-mt-8 p-10 ">
                <p className='mt-2 '>1. ไปที่จุดบริการของโรงพยาบาล</p>

                <p className='mt-2 '>2. แจ้งความประสงค์  <span className="text-[#F15D4F]">ลงทะเบียนฮุกกะ </span> พร้อมบัตรประชาชน</p>

                <p className='mt-2'>3. รับ <span className="text-[#F15D4F]">“รหัสผ่าน”</span> จากเจ้าหน้าที่</p>

                <p className='mt-2'>4. กรอก <span className="text-[#F15D4F]">“เลขประจำตัวประชาชน” </span>และ <span className="text-[#F15D4F]">“รหัสผ่าน” </span>เพื่อเข้าใช้งาน</p>

            </div>
            <div className='flex justify-center mt-2'>
                <Image
                    priority
                    src={pix}
                    alt="pix"
                    // width={140}
                    height={140}

                />

            </div>


        </div>

    )
}

export default Register