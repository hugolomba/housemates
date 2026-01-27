import Link from "next/link";

export default function MainButton({
  children,
  onClick,
  type = "button",
  className = "",
  href,
  isLoading = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  href?: string;
  isLoading?: boolean;
}) {
  const baseClass =
    "bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-green-600 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const content = (
    <>
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : null}
      <span className={isLoading ? "ml-2" : ""}>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClass} ${className}`}
    >
      {content}
    </button>
  );
}
