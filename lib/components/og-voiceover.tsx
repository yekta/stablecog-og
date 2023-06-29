import {
  cleanText,
  cubicSplineInterpolation,
  interpolateArray,
  monotoneCubicInterpolation,
  normalizeArray,
} from "./helpers";

export default async function OG({
  speakerImageUrl,
  prompt,
  audioArray,
}: {
  width: number;
  height: number;
  speakerImageUrl: string | null;
  prompt: string;
  audioArray: number[] | null;
}) {
  prompt = cleanText(prompt).slice(0, 200);

  const padding = 48;
  const bgColor = "rgb(18, 18, 23)";
  const onBgColor = "rgb(220, 220, 234)";
  const primaryColor = "rgb(181 140 255)";
  const dotColor = "rgba(220, 220, 234, 0.03)";
  const dotDistance = 32;
  const dotSizePercent = 5;

  const valueMin = 0.2;
  const valueMax = 1;
  const valueCount = 50;
  const placeholderArray = Array.from({ length: valueCount }).map(
    () => Math.random() * (1 - valueMin) + valueMin
  );
  const audioArrayFinal = monotoneCubicInterpolation({
    data: normalizeArray({
      array: audioArray ?? placeholderArray,
      min: valueMin,
    }),
    fitCount: valueCount,
    min: valueMin,
    max: valueMax,
  });
  return (
    <div
      style={{
        background: bgColor,
        color: onBgColor,
        padding: padding,
        /* backgroundImage: `
          radial-gradient(circle at 0px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at 0px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px 0px, ${dotColor} ${dotSizePercent}%, transparent 0%),
          radial-gradient(circle at ${dotDistance}px ${dotDistance}px, ${dotColor} ${dotSizePercent}%, transparent 0%)
        `,
        backgroundSize: `${dotDistance}px ${dotDistance}px`, */
      }}
      tw="flex flex-col w-full h-full items-center justify-center"
    >
      {/* Header */}
      <div
        style={{ marginTop: -32 }}
        tw="w-full flex justify-between items-center"
      >
        {speakerImageUrl && (
          <div tw="flex" style={{ paddingRight: 20 }}>
            <img
              style={{
                width: 56,
                height: 56,
                background: "rgb(220, 220, 234)",
                borderRadius: 12,
              }}
              src={speakerImageUrl}
            ></img>
          </div>
        )}
        <p
          style={{
            fontSize: 32,
            whiteSpace: "nowrap",
            overflow: "hidden",
            paddingBottom: 15,
            paddingRight: 48,
            textOverflow: "ellipsis",
            fontWeight: 500,
          }}
          tw="flex-1 min-w-0"
        >
          {prompt}
          {prompt && prompt.length > 0 ? "" : "..."}
        </p>
        <svg
          style={{ width: 220, height: 50.0689655 }}
          viewBox="0 0 290 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.83053 49.6532C0.516626 50.9671 0.502996 53.1254 2.01536 54.2049C2.52575 54.5692 3.04929 54.907 3.58406 55.218C4.56173 55.7868 5.10857 56.9186 4.81583 58.0111C4.57537 58.9085 5.10794 59.8309 6.00535 60.0714L9.25517 60.9422C10.1526 61.1827 11.075 60.6501 11.3155 59.7527L11.3308 59.6953C11.6155 58.6329 12.6259 57.9448 13.7258 57.9448C14.8256 57.9448 15.836 58.6329 16.1207 59.6953L16.136 59.7526C16.3765 60.6501 17.2989 61.1826 18.1963 60.9422L21.4462 60.0714C22.3436 59.8309 22.8761 58.9085 22.6357 58.0111L22.6216 57.9587C22.337 56.8964 22.8581 55.8009 23.8105 55.251C24.7637 54.7007 25.9936 54.7839 26.7719 55.5622L26.8104 55.6007C27.4673 56.2577 28.5325 56.2577 29.1894 55.6007L31.5685 53.2217C32.2254 52.5648 32.2254 51.4996 31.5685 50.8427L31.5299 50.8041C30.7517 50.0259 30.6684 48.796 31.2187 47.8428C31.7686 46.8904 32.8641 46.3693 33.9264 46.6539L33.9788 46.6679C34.8762 46.9084 35.7986 46.3758 36.0391 45.4784L36.9099 42.2286C37.1503 41.3312 36.6178 40.4088 35.7204 40.1683L35.6631 40.153C34.6007 39.8683 33.9125 38.8579 33.9125 37.758C33.9125 36.6581 34.6007 35.6477 35.6631 35.363L35.7203 35.3477C36.6178 35.1072 37.1503 34.1848 36.9099 33.2874L36.0391 30.0376C35.7986 29.1401 34.8762 28.6076 33.9788 28.848C32.8863 29.1408 31.7545 28.594 31.1858 27.6163C30.3268 26.1397 29.2648 24.7487 27.9999 23.4838L1.83053 49.6532Z"
            fill="url(#paint0_linear_1060_66734)"
          />
          <path
            d="M1.83053 49.6532C0.516626 50.9671 0.502996 53.1254 2.01536 54.2049C2.52575 54.5692 3.04929 54.907 3.58406 55.218C4.56173 55.7868 5.10857 56.9186 4.81583 58.0111C4.57537 58.9085 5.10794 59.8309 6.00535 60.0714L9.25517 60.9422C10.1526 61.1827 11.075 60.6501 11.3155 59.7527L11.3308 59.6953C11.6155 58.6329 12.6259 57.9448 13.7258 57.9448C14.8256 57.9448 15.836 58.6329 16.1207 59.6953L16.136 59.7526C16.3765 60.6501 17.2989 61.1826 18.1963 60.9422L21.4462 60.0714C22.3436 59.8309 22.8761 58.9085 22.6357 58.0111L22.6216 57.9587C22.337 56.8964 22.8581 55.8009 23.8105 55.251C24.7637 54.7007 25.9936 54.7839 26.7719 55.5622L26.8104 55.6007C27.4673 56.2577 28.5325 56.2577 29.1894 55.6007L31.5685 53.2217C32.2254 52.5648 32.2254 51.4996 31.5685 50.8427L31.5299 50.8041C30.7517 50.0259 30.6684 48.796 31.2187 47.8428C31.7686 46.8904 32.8641 46.3693 33.9264 46.6539L33.9788 46.6679C34.8762 46.9084 35.7986 46.3758 36.0391 45.4784L36.9099 42.2286C37.1503 41.3312 36.6178 40.4088 35.7204 40.1683L35.6631 40.153C34.6007 39.8683 33.9125 38.8579 33.9125 37.758C33.9125 36.6581 34.6007 35.6477 35.6631 35.363L35.7203 35.3477C36.6178 35.1072 37.1503 34.1848 36.9099 33.2874L36.0391 30.0376C35.7986 29.1401 34.8762 28.6076 33.9788 28.848C32.8863 29.1408 31.7545 28.594 31.1858 27.6163C30.3268 26.1397 29.2648 24.7487 27.9999 23.4838L1.83053 49.6532Z"
            fill="url(#paint1_linear_1060_66734)"
          />
          <path
            d="M5.39912 15.1572C4.74217 14.5002 4.74217 13.4351 5.39912 12.7781L7.77816 10.3991C8.43511 9.74214 9.50024 9.74214 10.1572 10.3991L10.1957 10.4376C10.974 11.2159 12.2039 11.2991 13.1571 10.7488C14.1095 10.199 14.6306 9.10341 14.346 8.04114L14.332 7.98883C14.0915 7.09142 14.6241 6.16899 15.5215 5.92852L18.7713 5.05774C19.6687 4.81728 20.5912 5.34984 20.8316 6.24726L20.8469 6.30445C21.1316 7.36689 22.142 8.05507 23.2419 8.05508C24.3418 8.05508 25.3522 7.36689 25.6369 6.30445L25.6522 6.24729C25.8927 5.34988 26.8151 4.81731 27.7125 5.05777L30.9624 5.92856C31.8598 6.16902 32.3923 7.09145 32.1519 7.98887C31.8592 9.08135 32.406 10.2131 33.3836 10.7818C33.9183 11.0929 34.4419 11.4306 34.9522 11.7949C36.4646 12.8745 36.451 15.0328 35.1371 16.3467L8.96767 42.5161C7.70278 41.2512 6.64083 39.8602 5.78184 38.3836C5.21312 37.4059 4.08133 36.8591 2.98883 37.1518C2.09142 37.3923 1.16899 36.8597 0.928525 35.9623L0.0577381 32.7125C-0.182723 31.8151 0.349842 30.8926 1.24726 30.6522L1.30451 30.6368C2.36693 30.3521 3.0551 29.3418 3.0551 28.2419C3.0551 27.142 2.36693 26.1316 1.30451 25.8469L1.24728 25.8316C0.349868 25.5911 -0.182696 24.6687 0.0577652 23.7713L0.928552 20.5215C1.16901 19.6241 2.09144 19.0915 2.98886 19.332L3.04116 19.346C4.10344 19.6306 5.19899 19.1095 5.74886 18.1571C6.29917 17.2039 6.21592 15.974 5.43765 15.1957L5.39912 15.1572Z"
            fill="url(#paint2_linear_1060_66734)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.11003 14.4463C5.45307 13.7893 5.45307 12.7242 6.11003 12.0673L5.39912 12.7782C4.74217 13.4351 4.74217 14.5002 5.39912 15.1572L5.43765 15.1957C6.21592 15.974 6.29917 17.2039 5.74886 18.1571C5.71939 18.2082 5.68835 18.258 5.65583 18.3065C5.97885 18.0912 6.25657 17.7982 6.45977 17.4462C7.01008 16.493 6.92683 15.2631 6.14855 14.4848L6.11003 14.4463ZM1.77319 19.4666C1.37127 19.6771 1.05525 20.0487 0.928552 20.5215L0.0577652 23.7713C-0.182696 24.6687 0.349868 25.5912 1.24728 25.8316L1.30451 25.847C2.36693 26.1316 3.0551 27.142 3.0551 28.2419C3.0551 28.7514 2.90744 29.2417 2.64333 29.6495C3.34099 29.2045 3.76601 28.3954 3.76601 27.531C3.76601 26.4311 3.07783 25.4207 2.01541 25.1361L1.95819 25.1207C1.06077 24.8803 0.52821 23.9578 0.768671 23.0604L1.63946 19.8106C1.67208 19.6889 1.71724 19.5738 1.77319 19.4666ZM0.903216 30.7859C0.219583 31.1424 -0.150105 31.9368 0.0577381 32.7125L0.928525 35.9623C1.16899 36.8597 2.09142 37.3923 2.98883 37.1518C4.08133 36.8591 5.21312 37.4059 5.78184 38.3836C6.64083 39.8602 7.70278 41.2512 8.96767 42.5161L9.67858 41.8052C8.41368 40.5403 7.35174 39.1493 6.49275 37.6727C5.92403 36.695 4.79224 36.1482 3.69974 36.4409C2.80232 36.6814 1.87989 36.1488 1.63943 35.2514L0.768644 32.0016C0.654878 31.577 0.714145 31.1468 0.903216 30.7859ZM2.53768 48.9461L1.83053 49.6532C0.516627 50.9671 0.502998 53.1254 2.01536 54.205C2.52575 54.5693 3.04929 54.907 3.58406 55.2181C4.56173 55.7868 5.10857 56.9186 4.81584 58.0112C4.57537 58.9086 5.10794 59.831 6.00535 60.0715L9.25517 60.9422C10.0309 61.1501 10.8252 60.7804 11.1817 60.0968C10.8208 60.2858 10.3907 60.3451 9.96611 60.2313L6.71629 59.3605C5.81887 59.1201 5.28631 58.1976 5.52677 57.3002C5.81951 56.2077 5.27267 55.0759 4.295 54.5072C3.76023 54.1961 3.23668 53.8584 2.7263 53.494C1.21539 52.4155 1.22754 50.2603 2.53768 48.9461ZM12.3182 58.3566C12.726 58.0925 13.2163 57.9448 13.7258 57.9448C14.8256 57.9448 15.836 58.633 16.1207 59.6954L16.136 59.7527C16.3765 60.6501 17.2989 61.1827 18.1963 60.9422L21.4462 60.0714C21.919 59.9447 22.2906 59.6287 22.5011 59.2268C22.3938 59.2827 22.2788 59.3279 22.1571 59.3605L18.9073 60.2313C18.0099 60.4717 17.0874 59.9392 16.847 59.0418L16.8316 58.9845C16.5469 57.922 15.5366 57.2339 14.4367 57.2339C13.5723 57.2339 12.7632 57.6589 12.3182 58.3566ZM23.6612 55.3441C23.7097 55.3115 23.7595 55.2805 23.8105 55.251C24.7637 54.7007 25.9936 54.784 26.7719 55.5623L26.8104 55.6008C27.4673 56.2577 28.5325 56.2577 29.1894 55.6008L29.9004 54.8899C29.2434 55.5468 28.1783 55.5468 27.5213 54.8899L27.4828 54.8513C26.7045 54.0731 25.4746 53.9898 24.5214 54.5401C24.1695 54.7433 23.8764 55.021 23.6612 55.3441ZM32.0227 46.9826C32.5737 46.6153 33.2567 46.4745 33.9264 46.654L33.9788 46.668C34.7545 46.8758 35.5489 46.5062 35.9054 45.8225C35.5445 46.0116 35.1143 46.0708 34.6897 45.9571L34.6373 45.943C33.632 45.6736 32.5968 46.126 32.0227 46.9826ZM35.0352 35.6395C35.2253 35.5183 35.4356 35.424 35.6631 35.3631L35.7203 35.3477C36.1932 35.221 36.5647 34.905 36.7753 34.5031C36.668 34.559 36.553 34.6042 36.4313 34.6368L36.374 34.6522C35.8037 34.805 35.3413 35.1669 35.0352 35.6395ZM26.4969 5.19238C26.095 5.40294 25.7789 5.77449 25.6522 6.24733L25.6369 6.30449C25.576 6.53199 25.4817 6.74233 25.3605 6.93243C25.8331 6.62635 26.195 6.16389 26.3478 5.59358L26.3631 5.53642C26.3958 5.41469 26.4409 5.29967 26.4969 5.19238ZM15.1775 6.0623C14.4938 6.41882 14.1241 7.21319 14.332 7.98887L14.346 8.04117C14.5254 8.7109 14.3846 9.39384 14.0174 9.94493C14.874 9.37075 15.3263 8.33561 15.0569 7.33027L15.0429 7.27796C14.9291 6.85338 14.9884 6.42321 15.1775 6.0623Z"
            fill="url(#paint3_linear_1060_66734)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.94474 19.0175C4.39369 19.3846 3.71083 19.5254 3.04119 19.346L2.98889 19.332C2.21324 19.1241 1.4189 19.4938 1.06236 20.1773C1.42324 19.9883 1.85335 19.9291 2.27787 20.0429L2.33017 20.0569C3.33546 20.3262 4.37054 19.874 4.94474 19.0175ZM1.93226 30.3605C1.74222 30.4817 1.53195 30.5759 1.30454 30.6368L1.24728 30.6522C0.774482 30.7788 0.402951 31.0948 0.192383 31.4967C0.299625 31.4408 0.414591 31.3957 0.536264 31.3631L0.593519 31.3477C1.16376 31.1949 1.62619 30.8331 1.93226 30.3605ZM10.4707 60.8077C10.8727 60.5972 11.1888 60.2256 11.3155 59.7527L11.3309 59.6954C11.3918 59.4678 11.4861 59.2575 11.6074 59.0673C11.1346 59.3734 10.7727 59.8359 10.6198 60.4063L10.6045 60.4636C10.5718 60.5854 10.5266 60.7004 10.4707 60.8077ZM21.7901 59.9377C22.4738 59.5813 22.8436 58.7868 22.6357 58.0111L22.6217 57.9587C22.4422 57.2889 22.583 56.6059 22.9503 56.0548C22.0936 56.629 21.6412 57.6642 21.9106 58.6696L21.9247 58.722C22.0384 59.1466 21.9791 59.5768 21.7901 59.9377ZM29.1782 55.6119C29.182 55.6082 29.1857 55.6045 29.1895 55.6008L31.5685 53.2217C32.2254 52.5648 32.2254 51.4996 31.5685 50.8427L31.5299 50.8041C30.7517 50.0259 30.6684 48.796 31.2187 47.8428C31.2482 47.7917 31.2793 47.7419 31.3118 47.6933C30.9887 47.9086 30.7109 48.2017 30.5077 48.5537C29.9574 49.5069 30.0406 50.7368 30.8189 51.5151L30.8574 51.5536C31.5144 52.2106 31.5144 53.2757 30.8574 53.9327L29.1782 55.6119ZM35.1943 46.5335C35.5963 46.3229 35.9124 45.9514 36.0391 45.4784L36.9099 42.2286C37.1504 41.3312 36.6178 40.4088 35.7204 40.1683L35.6631 40.153C34.6007 39.8683 33.9125 38.8579 33.9125 37.758C33.9125 37.2485 34.0602 36.7582 34.3243 36.3503C33.6266 36.7953 33.2015 37.6045 33.2015 38.4689C33.2015 39.5689 33.8896 40.5792 34.9521 40.8639L35.0093 40.8793C35.9068 41.1197 36.4393 42.0422 36.1989 42.9396L35.3281 46.1894C35.2954 46.3111 35.2503 46.4262 35.1943 46.5335ZM36.0642 35.2141C36.748 34.8576 37.1177 34.0631 36.9099 33.2874L36.0391 30.0376C35.7986 29.1402 34.8762 28.6076 33.9788 28.8481C32.8863 29.1408 31.7545 28.594 31.1858 27.6163C30.3268 26.1397 29.2648 24.7487 27.9999 23.4838L35.1371 16.3467C36.451 15.0328 36.4646 12.8745 34.9523 11.7949C34.4419 11.4306 33.9184 11.0929 33.3836 10.7818C32.406 10.2131 31.8592 9.08135 32.1519 7.98887C32.3924 7.09145 31.8598 6.16902 30.9624 5.92856L27.7126 5.05777C26.9369 4.84994 26.1426 5.21959 25.786 5.90317C26.1469 5.71416 26.577 5.65493 27.0016 5.76868L30.2514 6.63947C31.1488 6.87993 31.6814 7.80236 31.4409 8.69977C31.1482 9.79225 31.695 10.924 32.6726 11.4927C33.2074 11.8038 33.7309 12.1415 34.2412 12.5058C35.7536 13.5854 35.74 15.7437 34.4261 17.0576L27.2889 24.1947C28.5538 25.4596 29.6157 26.8506 30.4747 28.3273C31.0435 29.3049 32.1752 29.8517 33.2677 29.559C34.1652 29.3185 35.0876 29.8511 35.328 30.7485L36.1988 33.9983C36.3126 34.4229 36.2533 34.8531 36.0642 35.2141ZM24.6494 7.64342C24.2416 7.90746 23.7514 8.05508 23.242 8.05508C22.142 8.05507 21.1317 7.36689 20.847 6.30445L20.8316 6.24726C20.5912 5.34984 19.6688 4.81728 18.7713 5.05774L15.5215 5.92852C15.0487 6.05521 14.6772 6.37119 14.4666 6.77308C14.5739 6.71717 14.6888 6.67203 14.8105 6.63943L18.0603 5.76864C18.9577 5.52818 19.8802 6.06075 20.1206 6.95816L20.136 7.01536C20.4206 8.07779 21.431 8.76598 22.5309 8.76598C23.3953 8.76598 24.2043 8.34102 24.6494 7.64342ZM13.3063 10.6559C13.2578 10.6884 13.2081 10.7194 13.1571 10.7488C12.2039 11.2991 10.974 11.2159 10.1957 10.4376L10.1572 10.3991C9.50027 9.74214 8.43514 9.74214 7.77818 10.3991L7.07907 11.0982C7.73692 10.4531 8.7932 10.457 9.4462 11.11L9.48473 11.1485C10.263 11.9268 11.4929 12.0101 12.4461 11.4597C12.798 11.2566 13.091 10.9789 13.3063 10.6559Z"
            fill="url(#paint4_linear_1060_66734)"
          />
          <path
            d="M77.7372 22.848C77.0332 21.952 76.1052 21.248 74.9532 20.736C73.8332 20.192 72.7452 19.92 71.6892 19.92C71.1452 19.92 70.5852 19.968 70.0092 20.064C69.4652 20.16 68.9692 20.352 68.5212 20.64C68.0732 20.896 67.6892 21.248 67.3692 21.696C67.0812 22.112 66.9372 22.656 66.9372 23.328C66.9372 23.904 67.0492 24.384 67.2732 24.768C67.5292 25.152 67.8812 25.488 68.3292 25.776C68.8092 26.064 69.3692 26.336 70.0092 26.592C70.6492 26.816 71.3692 27.056 72.1692 27.312C73.3212 27.696 74.5212 28.128 75.7692 28.608C77.0172 29.056 78.1532 29.664 79.1772 30.432C80.2012 31.2 81.0492 32.16 81.7212 33.312C82.3932 34.432 82.7292 35.84 82.7292 37.536C82.7292 39.488 82.3612 41.184 81.6252 42.624C80.9212 44.032 79.9612 45.2 78.7452 46.128C77.5292 47.056 76.1372 47.744 74.5692 48.192C73.0012 48.64 71.3852 48.864 69.7212 48.864C67.2892 48.864 64.9372 48.448 62.6652 47.616C60.3932 46.752 58.5052 45.536 57.0012 43.968L62.3772 38.496C63.2092 39.52 64.2972 40.384 65.6412 41.088C67.0172 41.76 68.3772 42.096 69.7212 42.096C70.3292 42.096 70.9212 42.032 71.4972 41.904C72.0732 41.776 72.5692 41.568 72.9852 41.28C73.4332 40.992 73.7852 40.608 74.0412 40.128C74.2972 39.648 74.4252 39.072 74.4252 38.4C74.4252 37.76 74.2652 37.216 73.9452 36.768C73.6252 36.32 73.1612 35.92 72.5532 35.568C71.9772 35.184 71.2412 34.848 70.3452 34.56C69.4812 34.24 68.4892 33.904 67.3692 33.552C66.2812 33.2 65.2092 32.784 64.1532 32.304C63.1292 31.824 62.2012 31.216 61.3692 30.48C60.5692 29.712 59.9132 28.8 59.4012 27.744C58.9212 26.656 58.6812 25.344 58.6812 23.808C58.6812 21.92 59.0652 20.304 59.8332 18.96C60.6012 17.616 61.6092 16.512 62.8572 15.648C64.1052 14.784 65.5132 14.16 67.0812 13.776C68.6492 13.36 70.2332 13.152 71.8332 13.152C73.7532 13.152 75.7052 13.504 77.6892 14.208C79.7052 14.912 81.4652 15.952 82.9692 17.328L77.7372 22.848ZM95.9753 30V39.12C95.9753 40.24 96.1833 41.088 96.5993 41.664C97.0473 42.208 97.8313 42.48 98.9513 42.48C99.3353 42.48 99.7353 42.448 100.151 42.384C100.599 42.32 100.967 42.224 101.255 42.096L101.351 47.856C100.807 48.048 100.119 48.208 99.2873 48.336C98.4553 48.496 97.6233 48.576 96.7913 48.576C95.1913 48.576 93.8473 48.384 92.7593 48C91.6713 47.584 90.7913 47.008 90.1193 46.272C89.4793 45.504 89.0153 44.608 88.7273 43.584C88.4393 42.528 88.2953 41.36 88.2953 40.08V30H84.4553V24.096H88.2473V17.808H95.9753V24.096H101.591V30H95.9753ZM119.403 37.584H118.395C117.531 37.584 116.651 37.632 115.755 37.728C114.891 37.792 114.107 37.936 113.403 38.16C112.731 38.384 112.171 38.72 111.723 39.168C111.275 39.584 111.051 40.144 111.051 40.848C111.051 41.296 111.147 41.68 111.339 42C111.563 42.32 111.835 42.576 112.155 42.768C112.475 42.96 112.843 43.104 113.259 43.2C113.675 43.264 114.075 43.296 114.459 43.296C116.059 43.296 117.275 42.864 118.107 42C118.971 41.104 119.403 39.904 119.403 38.4V37.584ZM104.955 27.36C106.363 26.016 107.995 25.008 109.851 24.336C111.739 23.664 113.659 23.328 115.611 23.328C117.627 23.328 119.323 23.584 120.699 24.096C122.107 24.576 123.243 25.344 124.107 26.4C124.971 27.424 125.595 28.736 125.979 30.336C126.395 31.904 126.603 33.776 126.603 35.952V48H119.403V45.456H119.259C118.651 46.448 117.723 47.216 116.475 47.76C115.259 48.304 113.931 48.576 112.491 48.576C111.531 48.576 110.539 48.448 109.515 48.192C108.491 47.936 107.547 47.52 106.683 46.944C105.851 46.368 105.163 45.6 104.619 44.64C104.075 43.68 103.803 42.496 103.803 41.088C103.803 39.36 104.267 37.968 105.195 36.912C106.155 35.856 107.371 35.04 108.843 34.464C110.347 33.888 112.011 33.504 113.835 33.312C115.659 33.12 117.435 33.024 119.163 33.024V32.64C119.163 31.456 118.747 30.592 117.915 30.048C117.083 29.472 116.059 29.184 114.843 29.184C113.723 29.184 112.635 29.424 111.579 29.904C110.555 30.384 109.675 30.96 108.939 31.632L104.955 27.36ZM159.118 35.952C159.118 37.616 158.862 39.216 158.35 40.752C157.838 42.288 157.086 43.648 156.094 44.832C155.134 45.984 153.95 46.912 152.542 47.616C151.134 48.32 149.534 48.672 147.742 48.672C146.142 48.672 144.622 48.352 143.182 47.712C141.774 47.04 140.686 46.096 139.918 44.88H139.822V48H132.574V11.712H140.446V26.64H140.542C141.214 25.84 142.158 25.104 143.374 24.432C144.59 23.76 146.078 23.424 147.838 23.424C149.566 23.424 151.118 23.76 152.494 24.432C153.902 25.104 155.086 26.016 156.046 27.168C157.038 28.32 157.79 29.664 158.302 31.2C158.846 32.704 159.118 34.288 159.118 35.952ZM151.534 35.952C151.534 35.184 151.406 34.432 151.15 33.696C150.926 32.96 150.574 32.32 150.094 31.776C149.614 31.2 149.022 30.736 148.318 30.384C147.614 30.032 146.798 29.856 145.87 29.856C144.974 29.856 144.174 30.032 143.47 30.384C142.766 30.736 142.158 31.2 141.646 31.776C141.166 32.352 140.782 33.008 140.494 33.744C140.238 34.48 140.11 35.232 140.11 36C140.11 36.768 140.238 37.52 140.494 38.256C140.782 38.992 141.166 39.648 141.646 40.224C142.158 40.8 142.766 41.264 143.47 41.616C144.174 41.968 144.974 42.144 145.87 42.144C146.798 42.144 147.614 41.968 148.318 41.616C149.022 41.264 149.614 40.8 150.094 40.224C150.574 39.648 150.926 38.992 151.15 38.256C151.406 37.488 151.534 36.72 151.534 35.952ZM164.215 48V11.712H172.183V48H164.215ZM194.88 33.312C194.88 32.064 194.48 30.992 193.68 30.096C192.912 29.2 191.744 28.752 190.176 28.752C189.408 28.752 188.704 28.88 188.064 29.136C187.424 29.36 186.864 29.68 186.384 30.096C185.904 30.512 185.52 31.008 185.232 31.584C184.944 32.128 184.784 32.704 184.752 33.312H194.88ZM202.128 36.336C202.128 36.656 202.128 36.976 202.128 37.296C202.128 37.616 202.112 37.92 202.08 38.208H184.752C184.816 38.88 185.008 39.488 185.328 40.032C185.68 40.576 186.112 41.056 186.624 41.472C187.168 41.856 187.76 42.16 188.4 42.384C189.072 42.608 189.76 42.72 190.464 42.72C191.712 42.72 192.768 42.496 193.632 42.048C194.496 41.568 195.2 40.96 195.744 40.224L201.216 43.68C200.096 45.312 198.608 46.576 196.752 47.472C194.928 48.336 192.8 48.768 190.368 48.768C188.576 48.768 186.88 48.496 185.28 47.952C183.68 47.376 182.272 46.56 181.056 45.504C179.872 44.416 178.928 43.088 178.224 41.52C177.552 39.952 177.216 38.16 177.216 36.144C177.216 34.192 177.552 32.432 178.224 30.864C178.896 29.264 179.808 27.92 180.96 26.832C182.112 25.712 183.472 24.848 185.04 24.24C186.608 23.632 188.304 23.328 190.128 23.328C191.888 23.328 193.504 23.632 194.976 24.24C196.448 24.816 197.712 25.664 198.768 26.784C199.824 27.904 200.64 29.264 201.216 30.864C201.824 32.464 202.128 34.288 202.128 36.336ZM223.473 31.824C223.025 31.248 222.417 30.784 221.649 30.432C220.881 30.08 220.097 29.904 219.297 29.904C218.465 29.904 217.713 30.08 217.041 30.432C216.369 30.752 215.793 31.2 215.313 31.776C214.833 32.32 214.449 32.96 214.161 33.696C213.905 34.432 213.777 35.216 213.777 36.048C213.777 36.88 213.905 37.664 214.161 38.4C214.417 39.136 214.785 39.792 215.265 40.368C215.777 40.912 216.369 41.344 217.041 41.664C217.745 41.984 218.529 42.144 219.393 42.144C220.193 42.144 220.977 42 221.745 41.712C222.545 41.392 223.185 40.944 223.665 40.368L228.033 45.696C227.041 46.656 225.761 47.408 224.193 47.952C222.625 48.496 220.961 48.768 219.201 48.768C217.313 48.768 215.553 48.48 213.921 47.904C212.289 47.328 210.865 46.496 209.649 45.408C208.465 44.288 207.521 42.944 206.817 41.376C206.145 39.808 205.809 38.032 205.809 36.048C205.809 34.096 206.145 32.336 206.817 30.768C207.521 29.2 208.465 27.872 209.649 26.784C210.865 25.664 212.289 24.816 213.921 24.24C215.553 23.632 217.297 23.328 219.153 23.328C220.017 23.328 220.865 23.408 221.697 23.568C222.561 23.728 223.377 23.952 224.145 24.24C224.945 24.496 225.665 24.832 226.305 25.248C226.977 25.632 227.553 26.064 228.033 26.544L223.473 31.824ZM256.494 35.952C256.494 37.904 256.142 39.68 255.438 41.28C254.734 42.848 253.774 44.192 252.558 45.312C251.342 46.4 249.934 47.248 248.334 47.856C246.734 48.464 245.022 48.768 243.198 48.768C241.406 48.768 239.694 48.464 238.062 47.856C236.462 47.248 235.054 46.4 233.838 45.312C232.654 44.192 231.71 42.848 231.006 41.28C230.302 39.68 229.95 37.904 229.95 35.952C229.95 34 230.302 32.24 231.006 30.672C231.71 29.104 232.654 27.776 233.838 26.688C235.054 25.6 236.462 24.768 238.062 24.192C239.694 23.616 241.406 23.328 243.198 23.328C245.022 23.328 246.734 23.616 248.334 24.192C249.934 24.768 251.342 25.6 252.558 26.688C253.774 27.776 254.734 29.104 255.438 30.672C256.142 32.24 256.494 34 256.494 35.952ZM248.91 35.952C248.91 35.184 248.782 34.432 248.526 33.696C248.27 32.96 247.902 32.32 247.422 31.776C246.942 31.2 246.35 30.736 245.646 30.384C244.942 30.032 244.126 29.856 243.198 29.856C242.27 29.856 241.454 30.032 240.75 30.384C240.046 30.736 239.454 31.2 238.974 31.776C238.526 32.32 238.174 32.96 237.918 33.696C237.694 34.432 237.582 35.184 237.582 35.952C237.582 36.72 237.694 37.472 237.918 38.208C238.174 38.944 238.542 39.616 239.022 40.224C239.502 40.8 240.094 41.264 240.798 41.616C241.502 41.968 242.318 42.144 243.246 42.144C244.174 42.144 244.99 41.968 245.694 41.616C246.398 41.264 246.99 40.8 247.47 40.224C247.95 39.616 248.302 38.944 248.526 38.208C248.782 37.472 248.91 36.72 248.91 35.952ZM286.822 45.744C286.822 48.08 286.486 50.112 285.814 51.84C285.142 53.568 284.198 54.992 282.982 56.112C281.766 57.264 280.278 58.112 278.518 58.656C276.79 59.232 274.87 59.52 272.758 59.52C270.646 59.52 268.47 59.2 266.23 58.56C264.022 57.92 262.102 56.992 260.47 55.776L264.406 50.16C265.558 51.184 266.822 51.936 268.198 52.416C269.606 52.928 270.982 53.184 272.326 53.184C274.63 53.184 276.326 52.576 277.414 51.36C278.534 50.144 279.094 48.528 279.094 46.512V45.072H278.95C278.214 46.032 277.222 46.8 275.974 47.376C274.726 47.952 273.302 48.24 271.702 48.24C269.878 48.24 268.262 47.92 266.854 47.28C265.446 46.608 264.246 45.712 263.254 44.592C262.294 43.472 261.558 42.176 261.046 40.704C260.534 39.2 260.278 37.616 260.278 35.952C260.278 34.288 260.534 32.704 261.046 31.2C261.558 29.696 262.294 28.368 263.254 27.216C264.246 26.064 265.446 25.152 266.854 24.48C268.262 23.776 269.862 23.424 271.654 23.424C273.158 23.424 274.598 23.728 275.974 24.336C277.35 24.944 278.454 25.888 279.286 27.168H279.382V24.096H286.822V45.744ZM279.334 35.904C279.334 35.104 279.19 34.336 278.902 33.6C278.646 32.864 278.262 32.224 277.75 31.68C277.238 31.104 276.63 30.656 275.926 30.336C275.222 30.016 274.422 29.856 273.526 29.856C272.63 29.856 271.83 30.016 271.126 30.336C270.454 30.656 269.878 31.088 269.398 31.632C268.918 32.176 268.55 32.816 268.294 33.552C268.038 34.288 267.91 35.072 267.91 35.904C267.91 36.704 268.038 37.472 268.294 38.208C268.55 38.944 268.918 39.6 269.398 40.176C269.878 40.72 270.454 41.168 271.126 41.52C271.83 41.84 272.63 42 273.526 42C274.422 42 275.222 41.84 275.926 41.52C276.662 41.168 277.27 40.72 277.75 40.176C278.262 39.632 278.646 38.992 278.902 38.256C279.19 37.52 279.334 36.736 279.334 35.904Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1060_66734"
              x1="28.1423"
              y1="23.7476"
              x2="-0.45561"
              y2="51.5045"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9866FF" />
              <stop offset="1" stop-color="#C3A6FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1060_66734"
              x1="17.7729"
              y1="29.882"
              x2="22.0384"
              y2="35.5693"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0F0F12" stop-opacity="0.1" />
              <stop offset="1" stop-color="#0F0F12" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_1060_66734"
              x1="9.13405"
              y1="42.3512"
              x2="37.2388"
              y2="14.2465"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9866FF" />
              <stop offset="1" stop-color="#C3A6FF" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_1060_66734"
              x1="2.13275"
              y1="54.3377"
              x2="20.6166"
              y2="34.432"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9C6CFF" />
              <stop offset="1" stop-color="#925CFF" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_1060_66734"
              x1="19.1484"
              y1="30.8349"
              x2="37.6766"
              y2="18.5151"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#AD85FF" />
              <stop offset="1" stop-color="#CEB7FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Waveform */}
      <div
        style={{
          borderRadius: 12,
          paddingTop: 24,
          paddingBottom: 4,
        }}
        tw="flex-1 w-full h-full flex flex-col items-center justify-between"
      >
        <div
          style={{ paddingTop: 16, paddingBottom: 16 }}
          tw="flex flex-1 flex-row items-center justify-between"
        >
          {audioArrayFinal.map((value, index) => (
            <div
              key={index}
              tw="flex"
              style={{
                height: `${value * 100}%`,
                width: `${100 / audioArrayFinal.length}%`,
                paddingRight: 3,
                paddingLeft: 3,
              }}
            >
              <div
                style={{
                  backgroundColor: primaryColor,
                  width: "100%",
                  height: "100%",
                  borderRadius: 9999,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
