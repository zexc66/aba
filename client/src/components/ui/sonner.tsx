import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-center"
      toastOptions={{
        style: {
          borderRadius: "2px",
          border: "1px solid rgba(11, 11, 16, 0.15)",
          fontFamily: "var(--font-sans)",
        },
        classNames: {
          success: "border-emerald-300 bg-emerald-50 text-emerald-900",
          error: "border-red-300 bg-red-50 text-red-900",
          info: "border-[#5a1f2e]/30 bg-white text-[#0b0b10]",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
