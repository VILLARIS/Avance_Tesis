import {
    MessageSquareText,
    Send,
    Paperclip,
    CheckCheck,
} from "lucide-react";

import ChatMessage from "./ChatMessage";
import QuickOptions from "./QuickOptions";

export default function ChatPanel() {
    return (
        <div
            className="
        overflow-hidden
        rounded-[22px]
        border
        border-white/80
        bg-white/95
        shadow-[0_20px_60px_rgba(30,64,175,0.08)]
        backdrop-blur-sm
      "
        >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div
                        className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-[#173cff]
              text-white
              shadow-[0_8px_20px_rgba(23,60,255,0.22)]
            "
                    >
                        <MessageSquareText size={19} />
                    </div>

                    <div>
                        <h3 className="text-[16px] font-bold text-[#07112d]">
                            Asistente de cotización
                        </h3>

                        <p className="mt-0.5 text-[12px] text-slate-500">
                            Te guiamos paso a paso para conocer tu proyecto
                        </p>
                    </div>
                </div>

                {/* PROGRESS */}
                <div className="hidden sm:block">
                    <p className="mb-2 text-right text-[11px] font-semibold text-slate-500">
                        Paso 2 de 6
                    </p>

                    <div className="flex gap-1.5">
                        <Progress active />
                        <Progress active />
                        <Progress />
                        <Progress />
                        <Progress />
                        <Progress />
                    </div>
                </div>
            </div>

            {/* CHAT */}
            <div
                className="
          h-[370px]
          overflow-y-auto
          scroll-smooth
          px-5
          py-5
          xl:h-[390px]
        "
            >
                <ChatMessage>
                    Hola, soy tu asistente de cotización. Comencemos con algunos datos
                    sobre tu proyecto.
                </ChatMessage>

                <ChatMessage>
                    ¿Qué tipo de sitio web necesitas?
                </ChatMessage>

                <QuickOptions
                    options={[
                        "Landing page",
                        "Web corporativa",
                        "Tienda online",
                        "Sistema web",
                        "Otro",
                    ]}
                    active="Web corporativa"
                />

                <UserMessage>
                    Necesito una web corporativa
                </UserMessage>

                <ChatMessage>
                    Perfecto. ¿Cuántas secciones o páginas estimas que necesitas?
                </ChatMessage>

                <QuickOptions
                    options={[
                        "1 - 3",
                        "4 - 6",
                        "7 - 10",
                        "Más de 10",
                    ]}
                    active="4 - 6"
                />

                <ChatMessage>
                    ¿Qué integraciones te gustaría incluir?
                </ChatMessage>

                <QuickOptions
                    options={[
                        "WhatsApp",
                        "Formulario de contacto",
                        "Pasarela de pago",
                        "Reservas",
                    ]}
                    active="WhatsApp"
                />

                <UserMessage>
                    WhatsApp y formulario de contacto
                </UserMessage>

                <ChatMessage>
                    Muy bien. ¿Necesitas diseño personalizado?
                </ChatMessage>

                <QuickOptions
                    options={[
                        "Sí",
                        "No",
                        "No estoy seguro",
                    ]}
                />
            </div>

            {/* INPUT */}
            <div className="border-t border-slate-100 bg-white px-4 py-3">
                <div
                    className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-slate-200
            bg-[#f8faff]
            px-3
            py-2
            transition
            focus-within:border-blue-300
            focus-within:bg-white
            focus-within:shadow-[0_0_0_4px_rgba(23,60,255,0.05)]
          "
                >
                    <button
                        type="button"
                        className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-white
              hover:text-[#173cff]
            "
                    >
                        <Paperclip size={17} />
                    </button>

                    <input
                        type="text"
                        placeholder="Escribe tu respuesta aquí..."
                        className="
              h-9
              min-w-0
              flex-1
              bg-transparent
              text-[13px]
              text-slate-700
              outline-none
              placeholder:text-slate-400
            "
                    />

                    <button
                        type="button"
                        className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#173cff]
              text-white
              shadow-[0_8px_20px_rgba(23,60,255,0.20)]
              transition
              hover:bg-[#0f31e6]
            "
                    >
                        <Send size={17} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function Progress({ active = false }) {
    return (
        <div
            className={`
        h-1.5
        w-7
        rounded-full
        ${active ? "bg-[#173cff]" : "bg-slate-200"}
      `}
        />
    );
}

function UserMessage({ children }) {
    return (
        <div className="mb-4 flex justify-end">
            <div className="max-w-[72%]">
                <div
                    className="
            rounded-2xl
            rounded-tr-md
            bg-[#173cff]
            px-4
            py-2.5
            text-[13px]
            leading-5
            text-white
            shadow-[0_8px_20px_rgba(23,60,255,0.12)]
          "
                >
                    {children}
                </div>

                <div className="mt-1 flex items-center justify-end gap-1 pr-1">
                    <span className="text-[10px] text-slate-400">
                        10:25
                    </span>

                    <CheckCheck
                        size={13}
                        className="text-[#173cff]"
                    />
                </div>
            </div>
        </div>
    );
}