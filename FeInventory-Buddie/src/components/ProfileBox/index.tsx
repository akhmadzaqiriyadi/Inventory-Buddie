"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProfileBox = () => {
  return (
    <>
      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src="/images/cover/cover-01.png"
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="sr-only"
                accept="image/png, image/jpg, image/jpeg"
              />
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">
              <Image
                src="/images/user/hehe.jpeg"
                width={160}
                height={160}
                className="overflow-hidden rounded-full"
                alt="profile"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
              Team Pawgrammers Amigos
            </h3>
            <p className="font-medium">CHAMP IF UTY</p>
            <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] grid-cols-3 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  2
                </span>
                <span className="text-body-sm">Achievement</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  39
                </span>
                <span className="text-body-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  39
                </span>
                <span className="text-body-sm-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-[720px]">
              <h4 className="font-medium text-dark dark:text-white">
                About Me
              </h4>
              <p className="mt-4">
                Wadah bagi mahasiswa Informatika UTY sebagai landasan meraih prestasi
              </p>
            </div>

            <div className="mt-4.5">
              <h4 className="mb-3.5 font-medium text-dark dark:text-white">
                Follow me on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1676_1804)">
                      <path
                        d="M12.8337 12.3752H15.1253L16.042 8.7085H12.8337V6.87516C12.8337 5.931 12.8337 5.04183 14.667 5.04183H16.042V1.96183C15.7432 1.92241 14.6147 1.8335 13.4231 1.8335C10.9343 1.8335 9.16699 3.35241 9.16699 6.14183V8.7085H6.41699V12.3752H9.16699V20.1668H12.8337V12.3752Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1676_1804">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.6894 18.5L9.90566 13.1069L5.16898 18.5H3.16504L9.01663 11.8394L3.16504 3.5H8.31001L11.8761 8.58297L16.3443 3.5H18.3482L12.7681 9.85216L18.8343 18.5H13.6894ZM15.921 16.9795H14.5719L6.03435 5.02047H7.38366L10.803 9.809L11.3943 10.6399L15.921 16.9795Z"
                      fill=""
                    />
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1676_1812)">
                      <path
                        d="M6.69596 4.58327C6.69572 5.0695 6.50233 5.53572 6.15834 5.87937C5.81436 6.22301 5.34794 6.41593 4.86171 6.41569C4.37548 6.41545 3.90926 6.22206 3.56562 5.87807C3.22197 5.53408 3.02905 5.06767 3.0293 4.58144C3.02954 4.09521 3.22293 3.62899 3.56692 3.28535C3.9109 2.9417 4.37732 2.74878 4.86355 2.74902C5.34978 2.74927 5.816 2.94265 6.15964 3.28664C6.50329 3.63063 6.69621 4.09704 6.69596 4.58327ZM6.75096 7.77327H3.0843V19.2499H6.75096V7.77327ZM12.5443 7.77327H8.89596V19.2499H12.5076V13.2274C12.5076 9.87244 16.8801 9.56077 16.8801 13.2274V19.2499H20.501V11.9808C20.501 6.32494 14.0293 6.53577 12.5076 9.31327L12.5443 7.77327Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1676_1812">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.333984)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1676_1816)">
                      <path
                        d="M18.3229 10.6078C18.2478 9.16492 17.7459 7.7768 16.881 6.61941C16.6175 6.90324 16.3358 7.16964 16.0377 7.41691C15.1219 8.17761 14.0985 8.79851 13.0008 9.25942C13.1538 9.58025 13.2941 9.891 13.4178 10.1843V10.1871C13.4528 10.269 13.4864 10.3516 13.5187 10.4346C14.9065 10.2787 16.3695 10.3356 17.7876 10.5272C17.9764 10.5528 18.1543 10.5803 18.3229 10.6078ZM9.72001 3.77866C10.6133 5.03741 11.4371 6.34408 12.1877 7.69283C13.3088 7.251 14.2355 6.69366 14.9817 6.07308C15.2407 5.85962 15.4845 5.62836 15.7113 5.381C14.3922 4.27157 12.7233 3.66438 10.9997 3.66683C10.5707 3.66654 10.1425 3.70365 9.72001 3.77775V3.77866ZM3.89826 9.16408C4.52272 9.14832 5.14643 9.11072 5.76826 9.05133C7.27126 8.9169 8.76143 8.66496 10.2251 8.29783C9.46015 6.96886 8.63427 5.6759 7.75009 4.42308C6.80567 4.89094 5.97291 5.55646 5.30832 6.37447C4.64372 7.19248 4.16283 8.14387 3.89826 9.16408ZM5.30076 15.6156C5.65643 15.0958 6.12393 14.511 6.74451 13.8748C8.07734 12.509 9.65034 11.4457 11.4708 10.859L11.5277 10.8425C11.3764 10.5088 11.2343 10.2109 11.0913 9.93042C9.40834 10.4208 7.63551 10.727 5.86909 10.8856C5.00743 10.9635 4.23468 10.9974 3.66634 11.0029C3.66472 12.6828 4.24228 14.3119 5.30168 15.6156H5.30076ZM13.7543 17.7973C13.4008 16.0146 12.9004 14.2642 12.2583 12.564C10.4231 13.2304 8.96101 14.2048 7.83076 15.3672C7.37463 15.8277 6.96984 16.3364 6.62351 16.8843C7.88742 17.8273 9.42271 18.3358 10.9997 18.3335C11.9438 18.3349 12.8792 18.1534 13.7543 17.7991V17.7973ZM15.4712 16.8118C16.9023 15.7116 17.8773 14.1221 18.2093 12.3477C17.8976 12.2697 17.5025 12.1918 17.068 12.1313C16.102 11.9922 15.1217 11.982 14.153 12.1011C14.6985 13.64 15.1389 15.2142 15.4712 16.8128V16.8118ZM10.9997 20.1668C5.93693 20.1668 1.83301 16.0629 1.83301 11.0002C1.83301 5.93741 5.93693 1.8335 10.9997 1.8335C16.0624 1.8335 20.1663 5.93741 20.1663 11.0002C20.1663 16.0629 16.0624 20.1668 10.9997 20.1668Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1676_1816">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>

                <Link
                  href="#"
                  className="hover:text-primary"
                  aria-label="social-icon"
                >
                  <svg
                    className="fill-current"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1676_1820)">
                      <path
                        d="M11.6657 1.8335C6.60111 1.8335 2.49902 5.93558 2.49902 11.0002C2.49799 12.9245 3.10294 14.8003 4.22806 16.3614C5.35318 17.9226 6.94133 19.0898 8.76719 19.6975C9.22553 19.7772 9.39694 19.5022 9.39694 19.2612C9.39694 19.0439 9.38503 18.3225 9.38503 17.5543C7.08236 17.9787 6.48653 16.9933 6.30319 16.4772C6.19961 16.2132 5.75319 15.4002 5.36361 15.182C5.04278 15.0106 4.58444 14.5862 5.35169 14.5752C6.07403 14.5632 6.58919 15.2397 6.76153 15.5147C7.58653 16.9007 8.90469 16.5112 9.43086 16.271C9.51153 15.6752 9.75169 15.2746 10.0157 15.0454C7.97611 14.8162 5.84486 14.0252 5.84486 10.5189C5.84486 9.52158 6.19961 8.6975 6.78444 8.05491C6.69278 7.82575 6.37194 6.88616 6.87611 5.62575C6.87611 5.62575 7.64336 5.38558 9.39694 6.56625C10.1432 6.35914 10.9142 6.25489 11.6886 6.25641C12.4678 6.25641 13.2469 6.35908 13.9803 6.56533C15.7329 5.37366 16.5011 5.62666 16.5011 5.62666C17.0053 6.88708 16.6844 7.82666 16.5928 8.05583C17.1767 8.6975 17.5324 9.51058 17.5324 10.5189C17.5324 14.0371 15.3901 14.8162 13.3505 15.0454C13.6824 15.3314 13.9693 15.8814 13.9693 16.7412C13.9693 17.9668 13.9574 18.9522 13.9574 19.2621C13.9574 19.5022 14.1297 19.7882 14.588 19.6966C16.4076 19.0822 17.9888 17.9127 19.1089 16.3527C20.2291 14.7927 20.8318 12.9207 20.8324 11.0002C20.8324 5.93558 16.7303 1.8335 11.6657 1.8335Z"
                        fill=""
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1676_1820">
                        <rect
                          width="22"
                          height="22"
                          fill="white"
                          transform="translate(0.666016)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
