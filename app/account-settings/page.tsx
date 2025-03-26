"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import BtnLoader from '../components/btnLoader/BtnLoader'
import { get, put } from '../utils/axiosHelpers'
import { AxiosError } from 'axios'
import Alert from '../components/alert/Alert'


interface UserData {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  address?: string;
  sex?: string;
  // Add other user properties as needed
}

export default function Page() {
  // State for navigation toggle
  const [toggleNav, setToggleNav] = useState<boolean>(false)

  // State for form status
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')
  const [alertType, setAlertType] = useState<string>('')
  
  // Available settings tabs
  const settings = ['Update Bio', 'Change Password', 'Update Contact Details', 'Deactivate Account']
  const [selectedTab, setSelectedTab] = useState<string>(settings[0])

  // State for image handling

  // Form data states
  const [passwordResetData, setPasswordResetData] = useState({
      current_password: '',
      new_password: '',
      confirmPassword: '',
  })

  const [contactData, setContactData] = useState({
      phone: '',
  })

  const [bioData, setBioData] = useState({
      bio: '',
      full_name:'',
      address:'',
      sex: ''
  })

  useEffect(() => {
    getUserProfile()
  }, [])

  async function getUserProfile() {
    try {
      const storedUser = localStorage.getItem('user')
      
      if (!storedUser) {
        console.error('No user found in localStorage')
        return
      }
      
      // Parse the stored user JSON string to an object
      const currentUser: UserData = JSON.parse(storedUser)
      
      if (!currentUser.id) {
        console.error('User ID not found')
        return
      }
      
      const response = await get(`/profile/user/${currentUser.id}`)
      console.log(response);
      
      if (!response.success) {
        throw new Error('Failed to fetch user profile')
      }
      
      setBioData({
        bio: response?.data?.bio || '',
        full_name: response?.data?.full_name || '',
        address: response?.data?.address || '',
        sex: response?.data?.sex || ''
      })
      
      setContactData({
        phone: response?.data?.phone || ''
      })
      
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const handleBioInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setBioData(prev => ({
          ...prev,
          [name]: value
      }));
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPasswordResetData(prev => ({
          ...prev,
          [name]: value
      }));
  };

  const handleConctactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setContactData(prev => ({
          ...prev,
          [name]: value
      }));
  }

  const handleToggleNav = (value: boolean) => {
    setToggleNav(value)
  }

  async function handlePasswordReset() {
    // Validation
    try {
      if(!passwordResetData.current_password || !passwordResetData.new_password || !passwordResetData.confirmPassword) {
          setMsg('Please fill in all fields.');
          setAlertType('error');
          return
      }
      if(passwordResetData.new_password!== passwordResetData.confirmPassword){
          setMsg('New password and confirm password field do not match.');
          setAlertType('error');
          return
      }
      setLoading(true)
      console.log("Reset Password");
      const response = await put('/dashboard/change-password', {
        current_password: passwordResetData.current_password, 
        new_password: passwordResetData.new_password
      });
      
      setMsg('Password reset was successful.');
      setAlertType('success');
      console.log(response);
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            setMsg(error.response?.data?.message || 'An error occurred');
        } else {
            setMsg('An unexpected error occurred.');
        }
        setAlertType('error');
    } finally {
        setLoading(false);
    }
  }

  async function handleContactUpdate() {
    // Validation
    try {
      if(!contactData.phone) {
          setMsg('Please fill in all fields.');
          setAlertType('error');
          return
      }
      setLoading(true)
      console.log("Update Contact");
      const response = await put('/dashboard/update-profile', {phone: contactData.phone});
      
      if(response.success) {
        setMsg('Contact was successfully updated.');
        setAlertType('success');
      }
      console.log(response);
    }
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMsg(error.response?.data?.message || 'An error occurred');
      } else {
        setMsg('An unexpected error occurred.');
      }
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  }

  async function updateBio(){
    try {
      setLoading(true)
      console.log("Update Bio");
      const response = await put('/dashboard/update-profile', {
        bio: bioData.bio, 
        full_name: bioData.full_name, 
        address: bioData.address, 
        sex: bioData.sex.toLocaleLowerCase()
      });
      
      if(response.success) {
        setMsg('Bio was successfully updated.');
        setAlertType('success');
      }
      console.log(response);
    }
    catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMsg(error.response?.data?.message || 'An error occurred');
      } else {
        setMsg('An unexpected error occurred.');
      }
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
      <div>
        <SideNav toggle={{
          toggleNav: toggleNav, 
          setToggleNav: handleToggleNav
        }}/>
        <div className={`w-full lg:w-[78%] ml-auto pb-5 ${toggleNav ? 'lg:ml-[22%]' : 'lg:ml-auto'}`}>
          <TopNav 
            toggle={{
              toggleNav: toggleNav,
              setToggleNav: handleToggleNav
            }}
            pageTitle={'Account Settings'}
          />
          
          <div className='mt-8 px-5'>
            <h2 className="text-xl font-medium mb-6">Account Settings</h2>
            <div className='flex flex-wrap items-center gap-5 border-b border-gray-200'>
              {
                settings.map((item, index) => (
                  <div onClick={() => setSelectedTab(item)} key={index} className={`cursor-pointer hover:border-b hover:border-gray-600 ${selectedTab === item ? 'border-b border-gray-600' : ''}`}>
                    {item}
                  </div>
                ))
              }
            </div>
            {
              selectedTab === 'Change Password' &&
              <div className='lg:w-[60%]'>
                <div className='mt-8'>
                    <p>Current Password</p>
                    <div className='border border-[#C2C5E1] h-[42px] rounded-[6px] mt-1 pr-2 flex items-center justify-between'>
                        <input onChange={handlePasswordInputChange} value={passwordResetData.current_password} name="current_password" type={showPassword ? "text" : "password"} placeholder='********' className='pl-2 w-full outline-none' />
                        {
                            showPassword?
                            <BsEyeSlash className='cursor-pointer' onClick={() => setShowPassword(false)}/>
                            :
                            <BsEye className='cursor-pointer' onClick={() => setShowPassword(true)}/>
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <p>New Password</p>
                    <div className='border border-[#C2C5E1] h-[42px] rounded-[6px] mt-1 pr-2 flex items-center justify-between'>
                        <input onChange={handlePasswordInputChange} value={passwordResetData.new_password} name="new_password" type={showPassword ? "text" : "password"} placeholder='********' className='pl-2 w-full outline-none' />
                        {
                            showPassword?
                            <BsEyeSlash className='cursor-pointer' onClick={() => setShowPassword(false)}/>
                            :
                            <BsEye className='cursor-pointer' onClick={() => setShowPassword(true)}/>
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <p>Confirm Password</p>
                    <div className='border border-[#C2C5E1] h-[42px] rounded-[6px] mt-1 pr-2 flex items-center justify-between'>
                        <input onChange={handlePasswordInputChange} value={passwordResetData.confirmPassword} name="confirmPassword" type={showPassword ? "text" : "password"} placeholder='********' className='pl-2 w-full outline-none' />
                        {
                            showPassword?
                            <BsEyeSlash className='cursor-pointer' onClick={() => setShowPassword(false)}/>
                            :
                            <BsEye className='cursor-pointer' onClick={() => setShowPassword(true)}/>
                        }
                    </div>
                </div>
                {
                  loading ?
                    <div className='mt-[40.4px] mb-[0.5rem]'>
                        <BtnLoader />
                    </div>
                    :
                    <button className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-6 rounded-[6px]' onClick={handlePasswordReset}>Save Changes</button>
                }
              </div>
            }

            {
              selectedTab === 'Update Bio' &&
                <div className='lg:w-[60%]'>
                  <div className='mt-8'>
                      <p>Full Name</p>
                      <input onChange={handleBioInputChange} value={bioData.full_name} name='full_name' type="text" placeholder='John' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
                  </div>
                  <div className='mt-8'>
                      <p>Sex</p>
                      <input onChange={handleBioInputChange} value={bioData.sex} name='sex' type="text" placeholder='Male' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
                  </div>
                  <div className='mt-8'>
                      <p>Address</p>
                      <input onChange={handleBioInputChange} value={bioData.address} name='address' type="text" placeholder='123 Abc Street' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
                  </div>
                  <div className='mt-5'>
                      <p>Bio</p>
                      <textarea onChange={handleBioInputChange} value={bioData.bio} name='bio' placeholder='Write a brief description about yourself.' className='outline-none block border border-[#C2C5E1] h-[120px] resize-none rounded-[6px] w-full pl-2'></textarea>
                  </div>
                  {
                    loading ?
                      <div className='mt-[40.4px] mb-[0.5rem]'>
                          <BtnLoader />
                      </div>
                      :
                      <button onClick={updateBio} className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-6 rounded-[6px]'>Save Changes</button>
                  }
                </div>
            }

            {
              selectedTab === 'Update Contact Details' &&
                <div className='lg:w-[60%]'>
                  <div className='mt-8'>
                      <p>Phone Number</p>
                      <input onChange={handleConctactInputChange} name='phone' value={contactData.phone} type="text" placeholder='080-123-456-789' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
                  </div>
                  {
                    loading ?
                      <div className='mt-[40.4px] mb-[0.5rem]'>
                          <BtnLoader />
                      </div>
                      :
                      <button onClick={handleContactUpdate} className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-6 rounded-[6px]'>Save Changes</button>
                  }
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}