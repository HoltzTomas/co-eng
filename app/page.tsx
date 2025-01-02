"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function LandingPage() {

  useEffect(() => {
    // Esta función verifica el hash y realiza el desplazamiento si es necesario
    const checkHashAndScroll = () => {
      const { hash } = window.location;
      if (hash === '#app' || hash === '#features') {
        const appElement = document.getElementById(hash.substring(1)); // Elimina el '#' del hash
        if (appElement) {
          appElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Llamar a checkHashAndScroll cuando el componente se monta
    checkHashAndScroll();

    // Agregar el listener para el evento hashchange
    window.addEventListener('hashchange', checkHashAndScroll);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('hashchange', checkHashAndScroll);
    };
  }, []);

  return <main className="w-full h-full">

    {/* Background fixed */}
    <div className="h-full fixed w-full bg-login-bg-gray z-[-10]" />

    {/* First section */}
    <div className="h-[100vh] hidden md:block" id="main">
      {/* Header */}
      <div className="h-[141px] justify-center flex items-center px-[68px] pt-[22px] flex-row">
        <p className="absolute left-[68px] text-[25px] font-bold">Notes Studio</p>
        <div className="hidden lg:flex flex-row items-center px-20 h-[81px] bg-white w-[716px] rounded-[40px] justify-around">
          <p className="font-bold text-orange">Home</p>
          <button className="font-bold text-[#B6B6B6]"
            onClick={() => {
              const appElement = document.getElementById("app");
              appElement?.scrollIntoView({ behavior: 'smooth' })
            }}
          >Funciones</button>
        </div>
        <Link href={'/sign-in'} className="z-[10] absolute right-[68px]">
          <Button className="rounded-xl h-12">Ingresar</Button>
        </Link>
      </div>

      {/* Title */}
      <div className="mt-[86px]">
        <p className="text-[140px] font-bold text-center text-title-gray text-shadow-title-landing leading-[132.5px]">Tus notas, pero inteligentes.</p>
        <p className="text-center text-[20px] font-[700] leading-[24.5px] mt-20 text-title-gray">Potencia tus apuntes con herramientas de AI y beneficiate de compartirlos</p>
      </div>

      <Ball className="absolute right-0 top-0 z-[-100]" />
      <BlackCircle className="absolute left-0 bottom-0" />
    </div>

    <div className="md:hidden" id="main">
      {/* Header */}


      {/* Title */}
      <div className="mt-[32px]">
        <p className="text-[40px] font-bold text-center text-title-gray text-shadow-title-landing leading-[65px]">Notes Studio</p>
      </div>

      {/* <MobileBall className="absolute right-0 top-[165px]" /> */}
      {/* <MobileBlackCircle className="absolute left-0 top-[165px]" /> */}
    </div>

    {/* APP section */}
    <div id="app" className="hidden md:flex flex-row h-[60vh] w-full items-center justify-center">
      <div className="w-[528px] mr-[72px]" >
        <h2 className="text-[47px] font-[700] leading-[50px] text-title-gray">Descubrí Notes Studio, tu compañero de estudio digital</h2>
        <Link href={'/sign-in'}>
          <Button className="mt-[30px]">Empeza a estudiar</Button>
        </Link>
      </div>
      <div className="p-[50px] w-[391px] h-fit bg-white rounded-[30px] shadow-dashboard">
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px]">Separa tus materias</p>
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px] mt-[9px]">Carga tus archivos teoricos y apuntes</p>
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px] mt-[9px]">Consulta tus documentos con un chat con AI</p>
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px] mt-[9px]">Obtene resoluciones de los ejercicios</p>
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px] mt-[9px]">Genera quizzes para estudiar</p>
      </div>
    </div>

    <div id="app" className="flex flex-col md:hidden mt-[49px] w-full items-center justify-center">
      <h2 className="text-[25px] text-center font-[700] leading-[27px] text-title-gray">Potencia tus apuntes con herramientas de AI y beneficiate de compartirlos</h2>
      {/* <MobileDashboardExample /> */}
      <Link href={'/sign-in'}>
        <Button className="mt-10 !important">Empeza a estudiar</Button>
      </Link>
    </div>

    <div className="md:hidden flex items-center justify-center mt-[77px] mx-[16px]" id="features">
      <div className="p-[50px] w-[391px] h-fit bg-white rounded-[30px] shadow-dashboard">
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px]">Separa tus materias</p>
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px] mt-[9px]">Carga tus archivos teoricos y apuntes</p>
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px] mt-[9px]">Consulta tus documentos con un chat con AI</p>
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px] mt-[9px]">Obtene resoluciones de los ejercicios</p>
        <p className="border-b text-dark-gray font-[700] text-[15px] py-[10px] mt-[9px]">Genera quizzes para estudiar</p>
      </div>
    </div>

    {/* FOOTER */}

    <footer className="hidden md:flex w-full px-[50px] pb-[39px]">

      <div className="w-full h-[110px] bg-black rounded-[20px] flex flex-row justify-between items-center px-[62px]">
        <p className="font-bold text-white">Notes Studio</p>
        <p className="text-white">By LGH Software</p>
      </div>

    </footer>

    <footer className="flex md:hidden w-full mt-[59px] px-[15px] pb-[39px]">

      <div className="w-full h-[110px] bg-black rounded-[20px] flex flex-row justify-between items-center px-[42px]">
        <p className="font-bold text-white">Notes Studio</p>
        <p className="text-white">By LGH Software</p>
      </div>

    </footer>

  </main>
}

function BlackCircle({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="496"
      height="722"
      fill="none"
      viewBox="0 0 496 722"
      className={className}
    >
      <circle
        cx="135"
        cy="361"
        r="301"
        fill="url(#paint0_radial_204_3136)"
        fillOpacity="0.5"
        shapeRendering="crispEdges"
      ></circle>
      <defs>
        <radialGradient
          id="paint0_radial_204_3136"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(114.326 18.669 268.213) scale(329.574)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEE"></stop>
          <stop offset="1" stopColor="#000000"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
}

function Ball({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="422"
      height="550"
      fill="none"
      viewBox="0 0 422 550"
      className={`${className} absolute right-[-100px]`} // Ajusta la posición a la derecha
    >
      <circle
        cx="211"
        cy="275"
        r="210.31"
        fill="url(#paint0_radial_204_3132)"
        fillOpacity="1"
        shapeRendering="crispEdges"
      ></circle>
      <defs>
        <radialGradient
          id="paint0_radial_204_3132"
          cx="50%"
          cy="50%"
          r="50%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#EEE" /> {/* Parte más clara en la parte superior izquierda */}
          <stop offset="100%" stopColor="#555555" /> {/* Parte más oscura, pero no negro total */}
        </radialGradient>
      </defs>
    </svg>
  );
}

