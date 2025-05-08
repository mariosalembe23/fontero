import Link from "next/link";

const RightPannel = () => {
  return (
    <div className="border-l h-full flex items-start flex-col justify-between border-zinc-200 px-7 py-8">
      <header>
        <h2 className=" font-medium text-zinc-900">Fontes</h2>
        <small className="text-zinc-500">
          Aqui estarão listadas todas as fontes que você adicionou ao sistema.
        </small>
        <div className="mt-4">
          <button className="w-full transition-all hover:bg-blue-600 cursor-pointer bg-blue-500 py-2 gap-2 text-[15px] text-white rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon size-5 icon-tabler icons-tabler-outline icon-tabler-typeface"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
              <path d="M17 17a2 2 0 0 1 -2 -2v-8h-5a2 2 0 0 0 -2 2" />
              <path d="M7 17a2.775 2.775 0 0 0 2.632 -1.897l.368 -1.103a13.4 13.4 0 0 1 3.236 -5.236l1.764 -1.764" />
              <path d="M10 14h5" />
            </svg>
            Adicionar fonte
          </button>
        </div>
        <div></div>
      </header>
      <footer className="w-full">
        <Link
          href={"/"}
          className="flex text-[15px] transition-all hover:text-black text-zinc-600 items-center justify-between w-full"
        >
          Suporte
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-help"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 17l0 .01" />
              <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
            </svg>
          </span>
        </Link>
      </footer>
    </div>
  );
};

export default RightPannel;
