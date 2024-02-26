import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import profileImg from "../../assets/avatar-removebg-preview.png"
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';
type Props = {
    avatar: string | null
}

function ProfileInfo({avatar}: Props) {
    const {user} = useSelector((state:any) => state.auth);
    const [name, setName] = useState(user.name);
    const [editProfile, {isSuccess:success, error:updateError}] = useEditProfileMutation();
    const [updateAvatar, {isSuccess,error}] = useUpdateAvatarMutation();
    const [loadUser, setLoadUser] = useState(false);
    const {} = useLoadUserQuery(undefined, {
        skip: loadUser ? false : true,
    })

    const imageHandler = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
          if(reader.readyState === 2){
            const avatar = reader.result;
                updateAvatar(avatar)  
          }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    useEffect(()=> {
        if(isSuccess || success){
            setLoadUser(true);
        }
        if(error || updateError){
            console.log(error)
        }
        if(success) {
          toast.success("Profile updated successfully")
        }
    },[isSuccess,error,success,updateError])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if( name !== ""){
          await  editProfile({name})
        }
    }
    return (
        <>
          <div className="w-full flex justify-center">
            <div className="relative">
              <Image
                src={user.avatar || avatar ? user.avatar.url || avatar : profileImg}
                alt=""
                width={100}
                height={100}
                className=" object-cover cursor-pointer aspect-square border-[3px] border-[#37a39a] rounded-full"
              />
              <input
                type="file"
                name=""
                id="avatar"
                className="hidden"
                onChange={imageHandler}
                accept="image/png,image/jpg,image/jpeg,image/webp"
              />
              <label htmlFor="avatar">
                <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                  <AiOutlineCamera size={20} className="z-1" />
                </div>
              </label>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full pl-6 800px:pl-10">
            <form onSubmit={handleSubmit}>
              <div className="800px:w-[50%] m-auto block pb-4">
                <div className="w-[100%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`input !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] pt-2">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    readOnly
                    className={`input !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={user?.email}
                  />
                </div>
                <input
                  className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Update"
                  type="submit"
                />
              </div>
            </form>
            <br />
          </div>
        </>
      );
}

export default ProfileInfo