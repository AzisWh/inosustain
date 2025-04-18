'use client';

import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

export function FooterComponent() {
  return (
    <Footer container className="!bg-[#0D4883]">
      <div className="w-full px-0 md:px-5">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="flex flex-col space-y-2">
            <h1
              className="text-[40px] md:text-[50px] font-bold text-white"
              style={{ fontFamily: 'Arlonbold' }}>
              Inosustain
            </h1>
            <p
              className="text-[16px] text-white font-extralight"
              style={{ fontFamily: 'MDSans' }}>
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
            <div className="mt-4 flex space-x-6 ">
              <FooterIcon
                href="#"
                icon={BsFacebook}
                className="!text-white !w-[33px] !h-[34px]"
              />
              <FooterIcon
                href="#"
                icon={BsInstagram}
                className="!text-white !w-[33px] !h-[34px]"
              />
              <FooterIcon
                href="#"
                icon={BsTwitter}
                className="!text-white !w-[33px] !h-[34px]"
              />
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row gap-8 mt-6 sm:mt-4 sm:grid-cols-3 sm:gap-6"
            style={{ fontFamily: 'DMSans' }}>
            <div>
              <FooterTitle title="about" className="!font-extrabold" />
              <FooterLinkGroup col>
                <FooterLink href="#">Flowbite</FooterLink>
                <FooterLink href="#">Tailwind CSS</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" className="!font-extrabold" />
              <FooterLinkGroup col>
                <FooterLink href="#">Github</FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" className="!font-extrabold" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="Inosustain™"
            year={2025}
            className="!text-white"
          />
        </div>
      </div>
    </Footer>
  );
}
