import Icon from "../icon";
import Loader from "../Loader";

export default function Button({
  onClick = () => {},
  children = <></>,
  type = "button",
  isWhite = false,
  icon = "",
  loading = false,
  iconColor = isWhite ? "black" : "white",
  iconSize = 20,
  fullWidth = false,
  iconRight = false,
}) {
  return (
    <button
      className={`h-[40px] flex items-center justify-center gap-[8px] px-[16px] rounded-sm cursor-pointer duration-200 drop-shadow-md text-sm font-semibold disabled:cursor-default ${
        fullWidth ? "w-full" : "w-auto"
      } ${
        isWhite
          ? "bg-neutral-50 hover:bg-neutral-200 disabled:bg-neutral-300 text-neutral-900"
          : "bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-500 text-neutral-50"
      }`}
      disabled={loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <Loader color={isWhite ? "#000000" : "#FFFFFF"} />
      ) : (
        <>
          {!iconRight && icon && (
            <Icon icon={icon} color={iconColor} size={iconSize} />
          )}
          {children}
          {iconRight && icon && (
            <Icon icon={icon} color={iconColor} size={iconSize} />
          )}
        </>
      )}
    </button>
  );
}
