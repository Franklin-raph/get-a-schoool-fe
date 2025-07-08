"use client"

import React, { useState } from 'react'
import Navbar from '../../components/nav-bar/Navbar'
import Footer from '../../components/footer/Footer'
import 'react-quill-new/dist/quill.snow.css';
import { formats, modules } from "../../utils/quillEditorConfig"
import dynamic from 'next/dynamic'
import { post } from '../../utils/axiosHelpers';
import { AxiosError } from 'axios';
import Alert from '../../components/alert/Alert';

import Cookies from 'js-cookie';
import 'react-image-crop/dist/ReactCrop.css'
import { CiImageOn } from 'react-icons/ci'
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => (
      <div className="h-[50px] bg-stone-100/80 animate-pulse rounded-md" />
    ),
});

interface UploadedImage {
    id: string;
    media: string;
}


export default function Page() {

    const [content, setBlogContent] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [cover_image, setCoverImage] = useState<UploadedImage | null>(null)
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const router = useRouter()

    const [fileUploadLoader, setFileUploadLoader] = useState<boolean>(false)
    const token = Cookies.get('token')

    const postBlog = async () => {
        if(!title || !content){
            setMsg('Please fill in all fields.');
            setAlertType('error');
            return;
        }
        console.log({title, content, cover_image});
        try {
            const response = await post('/posts/', {title, content, cover_image: cover_image?.id})
            console.log(response);
            setMsg(`Post created successfully.`)
            setAlertType('success')
            
        } catch (error:unknown) {
            if (error instanceof AxiosError) {
                setMsg(error.response?.data?.message || 'An error occurred');
            } else {
                setMsg('An unexpected error occurred.');
            }
            setAlertType('error');
        } finally {
            setFileUploadLoader(false);
        }

        console.log({title, content, cover_image});
        
    }

    async function handleFileUpload(file: File){
        console.log("Upload Profile Image ..... ");
        
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
        if(file.size > maxSizeInBytes){
            setMsg("File size should not exceed 5MB");
            setAlertType('error');
            return;
        }
        
        setFileUploadLoader(true);
        const formData = new FormData();
        formData.append('media', file);
        formData.append('media_type', 'photo');

        console.log(`Bearer ${token}`, formData);
    
    
        try {
            const res = await fetch(`https://admin.getaschool.com/upload`, {
                method: "POST",
                body: formData,
                headers : {
                    'Authorization': `Bearer ${token}`,
                }
            });
            
            const data = await res.json();
            console.log(res, data.data);
            setFileUploadLoader(false);
            
            if(res.ok === true) {
                setCoverImage(data.data);
                setMsg("File upload was successful");
                setAlertType('success');
            } else {
                setMsg("File upload wasn't successful");
                setAlertType('error');
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setMsg(error.response?.data?.message || 'Error uploading file');
            } else {
                setMsg('An unexpected error occurred.');
            }
                setFileUploadLoader(false);
                setAlertType('error');
        }
    }

  return (
    <div>
        {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem] flex items-center justify-between'>
                <div>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Answers To Questions</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Answers To Questions</span></p>
                </div>
                {
                    token &&
                    // <button className='border py-[6px] px-3 rounded-[4px] border-gray-400 text-gray-500 hover:bg-gray-200 md:text-[15px] text-[12px]' onClick={() => window.location.href = '/answerstoquestions/post-question'}>Post Question</button>
                    <button className='border py-[6px] px-3 rounded-[4px] border-gray-400 text-gray-500 hover:bg-gray-200 md:text-[15px] text-[12px]' onClick={() => router.push('/answerstoquestions/post-question')}>Post Question</button>
                }
            </div>
        </div>
        <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
            <div className='mt-6'>
                <p className='text-[#344054]'>Title</p>
                <input onChange={e => setTitle(e.target.value)} type="text" placeholder='Enter a title for your question here' className='outline-none block border border-[#C2C5E1] h-[48px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            <div className='mt-5'>
                <p className='text-[#344054] mb-1'>Content</p>
                <ReactQuill theme="snow" className='react-quill' value={content} onChange={e => setBlogContent(e)} formats={formats} modules={modules} />
            </div>
            {
                cover_image ?
                <div className='mt-5 relative'>
                    <div className='border-dashed border-[#98A2B3] border-2 rounded-[4px] p-[1rem] flex flex-col items-center justify-center mt-5'>
                        <img src={cover_image?.media} alt="" className='h-[300px] w-[300px]' />
                    </div>
                    <input
                        type="file"
                        className="z-[1] border cursor-pointer absolute top-0 opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files.length > 0) {
                                handleFileUpload(e.target.files[0]);
                            }
                        }}
                    />
                </div>
                :
                <div className='mt-5 relative'>
                    <div className='border-dashed border-[#98A2B3] border-2 rounded-[4px] p-[4rem] flex flex-col items-center justify-center mt-5'>
                        <CiImageOn className='text-[#98A2B3] text-[50px]' />
                        <p className='text-text-color font-[600] mt-5'>Click to upload</p>
                        <p className='text-[#98A2B3]'>PNG, JPG (max. 5mb)</p>
                    </div>
                    <input
                        type="file"
                        className="z-[1] border cursor-pointer absolute top-0 opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files.length > 0) {
                                handleFileUpload(e.target.files[0]);
                            }
                        }}
                    />
                </div>
            }

            {
                fileUploadLoader &&
                <div style={{position:'fixed', width:'100%', left:'0', top:'0', zIndex:'9999', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:"rgba(18, 18, 18, 0.8)" }}>
                    <div className="bg-white" style={{ borderRadius:'10px' }}>
                        {/* <i className=' ri-close-fill block text-[1.2rem] text-end mt-[1rem] mr-[1rem] cursor-pointer'></i> */}
                        <div className="flex items-center justify-between mt-[1rem] px-[2rem] mb-[2rem] flex-col" style={{ padding:'2rem', textAlign:'center' }} >
                            <img src='../images/loader.gif' style={{ height:'40px', width:'40px', margin:'12px auto 30px' }} />
                            <p className='text-gray-500 text-[15px] mb-2 text-center'>File Upload in progress, please do not refresh the page</p>
                        </div>
                    </div>
                </div>
            }
            <button onClick={postBlog} className='bg-[#FF0200] w-full py-[10px] rounded-[5px] text-white mt-3'>Save Question</button>
        </div>
        <Footer />
    </div>
  )
}
