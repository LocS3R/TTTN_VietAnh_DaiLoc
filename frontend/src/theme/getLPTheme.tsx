import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions, alpha } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import { lighten, darken } from "@mui/material";
declare module "@mui/material/styles/createPalette" {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}
}

export const brand = {
  50: "#F0F7FF",
  100: "#CEE5FD",
  200: "#9CCCFC",
  300: "#55A6F6",
  400: "#0A66C2",
  500: "#0959AA",
  600: "#064079",
  700: "#033363",
  800: "#02294F",
  900: "#021F3B",
};

export const secondary = {
  50: "#F9F0FF",
  100: "#E9CEFD",
  200: "#D49CFC",
  300: "#B355F6",
  400: "#750AC2",
  500: "#6709AA",
  600: "#490679",
  700: "#3B0363",
  800: "#2F024F",
  900: "#23023B",
};

export const gray = {
  50: "#FBFCFE",
  100: "#EAF0F5",
  200: "#D6E2EB",
  300: "#BFCCD9",
  400: "#94A6B8",
  500: "#5B6B7C",
  600: "#4C5967",
  700: "#364049",
  800: "#131B20",
  900: "#090E10",
};

export const green = {
  50: "#F6FEF6",
  100: "#E3FBE3",
  200: "#C7F7C7",
  300: "#A1E8A1",
  400: "#51BC51",
  500: "#1F7A1F",
  600: "#136C13",
  700: "#0A470A",
  800: "#042F04",
  900: "#021D02",
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      light: brand[200],
      main: brand[500],
      dark: brand[800],
      contrastText: brand[50],
      ...(mode === "dark" && {
        contrastText: brand[100],
        light: brand[300],
        main: brand[400],
        dark: brand[800],
      }),
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[800],
      ...(mode === "dark" && {
        light: secondary[400],
        main: secondary[500],
        dark: secondary[900],
      }),
    },
    warning: {
      main: "#F7B538",
      dark: "#F79F00",
      ...(mode === "dark" && { main: "#F7B538", dark: "#F79F00" }),
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
      ...(mode === "dark" && {
        light: "#D32F2F",
        main: "#D32F2F",
        dark: "#B22A2A",
      }),
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
      ...(mode === "dark" && {
        light: green[400],
        main: green[500],
        dark: green[700],
      }),
    },
    grey: {
      50: gray[50],
      100: gray[100],
      200: gray[200],
      300: gray[300],
      400: gray[400],
      500: gray[500],
      600: gray[600],
      700: gray[700],
      800: gray[800],
      900: gray[900],
    },
    divider: mode === "dark" ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
    background: {
      default: "#fff",
      paper: gray[50],
      ...(mode === "dark" && { default: gray[900], paper: gray[800] }),
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      ...(mode === "dark" && { primary: "#fff", secondary: gray[400] }),
    },
    action: {
      selected: `${alpha(brand[200], 0.2)}`,
      ...(mode === "dark" && {
        selected: alpha(brand[800], 0.2),
      }),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(","),
    h1: {
      fontSize: 60,
      fontWeight: 600,
      lineHeight: 78 / 70,
      letterSpacing: -0.2,
    },
    h2: {
      fontSize: 48,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 42,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 36,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
    body1: {
      fontWeight: 400,
      fontSize: 15,
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
    },
  },
});
const themeColors = {
  primary: "#5569ff",
  secondary: "#6E759F",
  success: "#57CA22",
  warning: "#FFA319",
  error: "#FF1943",
  info: "#33C2FF",
  black: "#223354",
  white: "#ffffff",
  primaryAlt: "#000C57",
};

const colors = {
  gradients: {
    blue1: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
    blue2: "linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)",
    blue3: "linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)",
    blue4: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
    blue5: "linear-gradient(135deg, #97ABFF 10%, #123597 100%)",
    orange1: "linear-gradient(135deg, #FCCF31 0%, #F55555 100%)",
    orange2: "linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)",
    orange3: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    purple1: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)",
    purple3: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    pink1: "linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)",
    pink2: "linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)",
    green1: "linear-gradient(135deg, #FFF720 0%, #3CD500 100%)",
    green2: "linear-gradient(to bottom, #00b09b, #96c93d)",
    black1: "linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%)",
    black2: "linear-gradient(60deg, #29323c 0%, #485563 100%)",
  },
  shadows: {
    success:
      "0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)",
    error:
      "0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)",
    info: "0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)",
    primary:
      "0px 1px 4px rgba(85, 105, 255, 0.25), 0px 3px 12px 2px rgba(85, 105, 255, 0.35)",
    warning:
      "0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)",
    card: "0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)",
    cardSm:
      "0px 2px 3px rgba(159, 162, 191, .18), 0px 1px 1px rgba(159, 162, 191, 0.32)",
    cardLg:
      "0 5rem 14rem 0 rgb(255 255 255 / 30%), 0 0.8rem 2.3rem rgb(0 0 0 / 60%), 0 0.2rem 0.3rem rgb(0 0 0 / 45%)",
  },
  layout: {
    general: {
      bodyBg: "#f2f5f9",
    },
    sidebar: {
      background: themeColors.white,
      textColor: themeColors.secondary,
      dividerBg: "#f2f5f9",
      menuItemColor: "#242E6F",
      menuItemColorActive: themeColors.primary,
      menuItemBg: themeColors.white,
      menuItemBgActive: "#f2f5f9",
      menuItemIconColor: lighten(themeColors.secondary, 0.3),
      menuItemIconColorActive: themeColors.primary,
      menuItemHeadingColor: darken(themeColors.secondary, 0.3),
    },
  },
  alpha: {
    white: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    trueWhite: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white,
    },
    black: {
      5: alpha(themeColors.black, 0.02),
      10: alpha(themeColors.black, 0.1),
      30: alpha(themeColors.black, 0.3),
      50: alpha(themeColors.black, 0.5),
      70: alpha(themeColors.black, 0.7),
      100: themeColors.black,
    },
  },
  secondary: {
    lighter: lighten(themeColors.secondary, 0.85),
    light: lighten(themeColors.secondary, 0.25),
    main: themeColors.secondary,
    dark: darken(themeColors.secondary, 0.2),
  },
  primary: {
    lighter: lighten(themeColors.primary, 0.85),
    light: lighten(themeColors.primary, 0.3),
    main: themeColors.primary,
    dark: darken(themeColors.primary, 0.2),
  },
  success: {
    lighter: lighten(themeColors.success, 0.85),
    light: lighten(themeColors.success, 0.3),
    main: themeColors.success,
    dark: darken(themeColors.success, 0.2),
  },
  warning: {
    lighter: lighten(themeColors.warning, 0.85),
    light: lighten(themeColors.warning, 0.3),
    main: themeColors.warning,
    dark: darken(themeColors.warning, 0.2),
  },
  error: {
    lighter: lighten(themeColors.error, 0.85),
    light: lighten(themeColors.error, 0.3),
    main: themeColors.error,
    dark: darken(themeColors.error, 0.2),
  },
  info: {
    lighter: lighten(themeColors.info, 0.85),
    light: lighten(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2),
  },
};

export default function getLPTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    colors: {
      gradients: {
        blue1: colors.gradients.blue1,
        blue2: colors.gradients.blue2,
        blue3: colors.gradients.blue3,
        blue4: colors.gradients.blue4,
        blue5: colors.gradients.blue5,
        orange1: colors.gradients.orange1,
        orange2: colors.gradients.orange2,
        orange3: colors.gradients.orange3,
        purple1: colors.gradients.purple1,
        purple3: colors.gradients.purple3,
        pink1: colors.gradients.pink1,
        pink2: colors.gradients.pink2,
        green1: colors.gradients.green1,
        green2: colors.gradients.green2,
        black1: colors.gradients.black1,
        black2: colors.gradients.black2,
      },
      shadows: {
        success: colors.shadows.success,
        error: colors.shadows.error,
        primary: colors.shadows.primary,
        info: colors.shadows.info,
        warning: colors.shadows.warning,
      },
      alpha: {
        white: {
          5: alpha(themeColors.white, 0.02),
          10: alpha(themeColors.white, 0.1),
          30: alpha(themeColors.white, 0.3),
          50: alpha(themeColors.white, 0.5),
          70: alpha(themeColors.white, 0.7),
          100: themeColors.white,
        },
        trueWhite: {
          5: alpha(themeColors.white, 0.02),
          10: alpha(themeColors.white, 0.1),
          30: alpha(themeColors.white, 0.3),
          50: alpha(themeColors.white, 0.5),
          70: alpha(themeColors.white, 0.7),
          100: themeColors.white,
        },
        black: {
          5: alpha(themeColors.black, 0.02),
          10: alpha(themeColors.black, 0.1),
          30: alpha(themeColors.black, 0.3),
          50: alpha(themeColors.black, 0.5),
          70: alpha(themeColors.black, 0.7),
          100: themeColors.black,
        },
      },
      secondary: {
        lighter: alpha(themeColors.secondary, 0.1),
        light: lighten(themeColors.secondary, 0.3),
        main: themeColors.secondary,
        dark: darken(themeColors.secondary, 0.2),
      },
      primary: {
        lighter: alpha(themeColors.primary, 0.1),
        light: lighten(themeColors.primary, 0.3),
        main: themeColors.primary,
        dark: darken(themeColors.primary, 0.2),
      },
      success: {
        lighter: alpha(themeColors.success, 0.1),
        light: lighten(themeColors.success, 0.3),
        main: themeColors.success,
        dark: darken(themeColors.success, 0.2),
      },
      warning: {
        lighter: alpha(themeColors.warning, 0.1),
        light: lighten(themeColors.warning, 0.3),
        main: themeColors.warning,
        dark: darken(themeColors.warning, 0.2),
      },
      error: {
        lighter: alpha(themeColors.error, 0.1),
        light: lighten(themeColors.error, 0.3),
        main: themeColors.error,
        dark: darken(themeColors.error, 0.2),
      },
      info: {
        lighter: alpha(themeColors.info, 0.1),
        light: lighten(themeColors.info, 0.3),
        main: themeColors.info,
        dark: darken(themeColors.info, 0.2),
      },
    },
    general: {
      reactFrameworkColor: "#00D8FF",
      borderRadiusSm: "6px",
      borderRadius: "10px",
      borderRadiusLg: "12px",
      borderRadiusXl: "16px",
    },
    sidebar: {
      background: colors.layout.sidebar.background,
      textColor: colors.layout.sidebar.textColor,
      dividerBg: colors.layout.sidebar.dividerBg,
      menuItemColor: colors.layout.sidebar.menuItemColor,
      menuItemColorActive: colors.layout.sidebar.menuItemColorActive,
      menuItemBg: colors.layout.sidebar.menuItemBg,
      menuItemBgActive: colors.layout.sidebar.menuItemBgActive,
      menuItemIconColor: colors.layout.sidebar.menuItemIconColor,
      menuItemIconColorActive: colors.layout.sidebar.menuItemIconColorActive,
      menuItemHeadingColor: colors.layout.sidebar.menuItemHeadingColor,
      boxShadow:
        "2px 0 3px rgba(159, 162, 191, .18), 1px 0 1px rgba(159, 162, 191, 0.32)",
      width: "290px",
    },
    header: {
      height: "80px",
      background: colors.alpha.white[100],
      boxShadow: colors.shadows.cardSm,
      textColor: colors.secondary.main,
    },
    components: {
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 8,
            overflow: "clip",
            backgroundColor: "#fff",
            border: "1px solid",
            borderColor: gray[100],
            ":before": {
              backgroundColor: "transparent",
            },
            "&:first-of-type": {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
            "&:last-of-type": {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
            ...(theme.palette.mode === "dark" && {
              backgroundColor: gray[900],
              borderColor: gray[800],
            }),
          }),
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: "none",
            borderRadius: 8,
            "&:hover": { backgroundColor: gray[100] },
            ...(theme.palette.mode === "dark" && {
              "&:hover": { backgroundColor: gray[800] },
            }),
          }),
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { mb: 20, border: "none" },
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "10px",
            boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
            "& .Mui-selected": {
              color: brand[500],
            },
            ...(theme.palette.mode === "dark" && {
              "& .Mui-selected": {
                color: "#fff",
              },
              boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: "12px 16px",
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 500,
            ...(theme.palette.mode === "dark" && {
              color: gray[400],
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
              "&.Mui-selected": { color: brand[300] },
            }),
          }),
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            boxSizing: "border-box",
            transition: "all 100ms ease-in",
            "&:focus-visible": {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              outlineOffset: "2px",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            boxSizing: "border-box",
            boxShadow: "none",
            borderRadius: "10px",
            textTransform: "none",
            "&:active": {
              transform: "scale(0.98)",
            },
            ...(ownerState.size === "small" && {
              maxHeight: "32px",
            }),
            ...(ownerState.size === "medium" && {
              height: "40px",
            }),
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                color: brand[50],
                background: brand[500],
                backgroundImage: `linear-gradient(to bottom, ${brand[400]}, ${brand[600]})`,
                boxShadow: `inset 0 1px ${alpha(brand[300], 0.4)}`,
                outline: `1px solid ${brand[700]}`,
                "&:hover": {
                  background: brand[400],
                  backgroundImage: "none",
                  boxShadow: `0 0 0 1px  ${alpha(brand[300], 0.5)}`,
                },
              }),
            ...(ownerState.variant === "outlined" && {
              backgroundColor: alpha(brand[300], 0.1),
              borderColor: brand[300],
              color: brand[500],
              "&:hover": {
                backgroundColor: alpha(brand[300], 0.3),
                borderColor: brand[200],
              },
            }),
            ...(ownerState.variant === "text" && {
              color: brand[500],
              "&:hover": {
                backgroundColor: alpha(brand[300], 0.3),
                borderColor: brand[200],
              },
            }),
            ...(theme.palette.mode === "dark" && {
              ...(ownerState.variant === "outlined" && {
                backgroundColor: alpha(brand[600], 0.1),
                borderColor: brand[700],
                color: brand[300],
                "&:hover": {
                  backgroundColor: alpha(brand[600], 0.3),
                  borderColor: brand[700],
                },
              }),
              ...(ownerState.variant === "text" && {
                color: brand[300],
                "&:hover": {
                  backgroundColor: alpha(brand[600], 0.3),
                  borderColor: brand[700],
                },
              }),
            }),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            backgroundColor: gray[50],
            borderRadius: 10,
            border: `1px solid ${alpha(gray[200], 0.8)}`,
            boxShadow: "none",
            transition: "background-color, border, 80ms ease",
            ...(ownerState.variant === "outlined" && {
              background: `linear-gradient(to bottom, #FFF, ${gray[50]})`,
              "&:hover": {
                borderColor: brand[300],
                boxShadow: `0 0 24px ${brand[100]}`,
              },
            }),
            ...(theme.palette.mode === "dark" && {
              backgroundColor: alpha(gray[800], 0.6),
              border: `1px solid ${alpha(gray[700], 0.3)}`,
              ...(ownerState.variant === "outlined" && {
                background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(
                  gray[800],
                  0.5
                )})`,
                "&:hover": {
                  borderColor: brand[700],
                  boxShadow: `0 0 24px ${brand[800]}`,
                },
              }),
            }),
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            alignSelf: "center",
            py: 1.5,
            px: 0.5,
            background: `linear-gradient(to bottom right, ${brand[50]}, ${brand[100]})`,
            border: "1px solid",
            borderColor: `${alpha(brand[500], 0.3)}`,
            fontWeight: "600",
            "&:hover": {
              backgroundColor: brand[500],
            },
            "&:focus-visible": {
              borderColor: brand[800],
              backgroundColor: brand[200],
            },
            "& .MuiChip-label": {
              color: brand[500],
            },
            "& .MuiChip-icon": {
              color: brand[500],
            },
            ...(theme.palette.mode === "dark" && {
              background: `linear-gradient(to bottom right, ${brand[700]}, ${brand[900]})`,
              borderColor: `${alpha(brand[500], 0.5)}`,
              "&:hover": {
                backgroundColor: brand[600],
              },
              "&:focus-visible": {
                borderColor: brand[200],
                backgroundColor: brand[600],
              },
              "& .MuiChip-label": {
                color: brand[200],
              },
              "& .MuiChip-icon": {
                color: brand[200],
              },
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: `${alpha(gray[200], 0.8)}`,
            ...(theme.palette.mode === "dark" && {
              borderColor: `${alpha(gray[700], 0.4)}`,
            }),
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "none",
        },
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand[600],
            fontWeight: 500,
            position: "relative",
            textDecoration: "none",
            "&::before": {
              content: '""',
              position: "absolute",
              width: 0,
              height: "1px",
              bottom: 0,
              left: 0,
              backgroundColor: brand[200],
              opacity: 0.7,
              transition: "width 0.3s ease, opacity 0.3s ease",
            },
            "&:hover::before": {
              width: "100%",
              opacity: 1,
            },
            ...(theme.palette.mode === "dark" && {
              color: brand[200],
            }),
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "99px",
            color: gray[500],
            fontWeight: 500,
            ...(theme.palette.mode === "dark" && {
              color: gray[300],
            }),
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            backgroundColor: gray[100],
            ...(theme.palette.mode === "dark" && {
              backgroundColor: alpha(gray[900], 0.6),
            }),
          }),
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxSizing: "border-box",
            width: 36,
            height: 24,
            padding: 0,
            transition: "background-color 100ms ease-in",
            "&:hover": {
              "& .MuiSwitch-track": {
                backgroundColor: brand[600],
              },
            },
            "& .MuiSwitch-switchBase": {
              "&.Mui-checked": {
                transform: "translateX(13px)",
              },
            },
            "& .MuiSwitch-track": {
              borderRadius: 50,
            },
            "& .MuiSwitch-thumb": {
              boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#FFF",
              width: 16,
              height: 16,
              margin: 2,
            },
            ...(theme.palette.mode === "dark" && {
              width: 36,
              height: 24,
              padding: 0,
              transition: "background-color 100ms ease-in",
              "&:hover": {
                "& .MuiSwitch-track": {
                  backgroundColor: brand[600],
                },
              },
              "& .MuiSwitch-switchBase": {
                "&.Mui-checked": {
                  transform: "translateX(13px)",
                },
              },
              "& .MuiSwitch-thumb": {
                boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.2)",
                backgroundColor: "#FFF",
                width: 16,
                height: 16,
                margin: 2,
              },
            }),
          }),
          switchBase: {
            height: 24,
            width: 24,
            padding: 0,
            color: "#fff",
            "&.Mui-checked + .MuiSwitch-track": {
              opacity: 1,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& label .Mui-focused": {
              color: "white",
            },
            "& .MuiInputBase-input": {
              boxSizing: "border-box",
              "&::placeholder": {
                opacity: 0.7,
              },
            },
            "& .MuiOutlinedInput-root": {
              boxSizing: "border-box",
              minWidth: 280,
              minHeight: 40,
              height: "100%",
              borderRadius: "10px",
              border: "1px solid",
              borderColor: gray[200],
              transition: "border-color 120ms ease-in",
              "& fieldset": {
                border: "none",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                background: `${alpha("#FFF", 0.3)}`,
              },
              "&:hover": {
                borderColor: brand[300],
              },
              "&.Mui-focused": {
                borderColor: brand[400],
                outline: "4px solid",
                outlineColor: brand[200],
              },
            },
            ...(theme.palette.mode === "dark" && {
              "& .MuiOutlinedInput-root": {
                boxSizing: "border-box",
                minWidth: 280,
                minHeight: 40,
                height: "100%",
                borderRadius: "10px",
                border: "1px solid",
                borderColor: gray[600],
                transition: "border-color 120ms ease-in",
                "& fieldset": {
                  border: "none",
                  boxShadow: " 0px 2px 4px rgba(0, 0, 0, 0.4)",
                  background: `${alpha(gray[800], 0.4)}`,
                },
                "&:hover": {
                  borderColor: brand[300],
                },
                "&.Mui-focused": {
                  borderColor: brand[400],
                  outline: "4px solid",
                  outlineColor: alpha(brand[500], 0.5),
                },
              },
            }),
          }),
        },
      },
    },
  };
}
