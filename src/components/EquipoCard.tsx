"use client";
import React from "react";
import Image from "next/image";
import mobile from "@/img/mobile.png";
import email from "@/img/email.png";
import location from "@/img/location.png";
interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface EquipoProfile {
  name: string;
  photo?: string;
  role: string;
  phone: string;
  email: string;
  nickname?: string;
  social?: SocialLinks;
  address?: string;
}

interface EquipoCardProps {
  profile: EquipoProfile;
}

const iconClass = "w-5 h-5 text-brand-primary";

export const EquipoCard: React.FC<EquipoCardProps> = ({ profile }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] rounded-2xl shadow-xl p-8 gap-8 border border-gray-200 max-w-xl w-full mx-auto">
      {/* Foto de perfil */}
      <div className="flex-shrink-0 flex items-center justify-center">
        {profile.photo && profile.photo.trim() !== "" ? (
          <div className="relative w-32 h-32 md:w-36 md:h-36">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              className="rounded-full object-cover border-4 border-white shadow-lg"
              style={{ background: '#e5e7eb' }}
              unoptimized={false}
              priority
            />
          </div>
        ) : (
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 border-4 border-white shadow-lg">
            {profile.name[0]}
          </div>
        )}
      </div>
      {/* Info principal */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#15396a] leading-tight mb-1 uppercase tracking-tight">{profile.name}</h3>
        <p className="text-lg md:text-xl font-semibold text-[#1e88e5] mb-2">{profile.role}</p>
        <div className="flex flex-col gap-2 text-base text-gray-800 mb-2">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Image src={mobile} alt="Móvil" className="w-6 h-6 object-contain" />
            <span className="text-gray-700">{profile.phone}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Image src={email} alt="Correo Electrónico" className="w-6 h-6 object-contain" />
            <span className="text-gray-700 break-all">{profile.email}</span>
          </div>
          {profile.address && (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Image src={location} alt="Ubicación" className="w-6 h-6 object-contain" />
              <span className="font-medium">{profile.address}</span>
            </div>
          )}
        </div>
        {/* LinkedIn */}
        {profile.social?.linkedin && (
          <div className="mt-2">
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#0a66c2] font-semibold hover:underline"
              title="Perfil LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              Perfil LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
