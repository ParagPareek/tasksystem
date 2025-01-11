import React from "react";

const Navbar3 = ({ theme }) => {
  // Default theme colors
  const defaultColors = {
    background: "#1e293b", // Dark background for navbar
    text: "#f3f4f6", // Light text
    button: "#3b82f6", // Blue button color
    buttonHover: "#2563eb", // Button hover color
    icon: "#ffffff", // Icon color
    searchBorder: "#d1d5db", // Search border color
    avatarBg: "#fbbf24", // Avatar background color
  };

  // Modify theme colors based on the passed theme
  const colors = theme === "dark" ? defaultColors : {
    background: "#ffffff", // Light background for navbar
    text: "#333333", // Dark text
    button: "#4caf50", // Green button color
    buttonHover: "#45a049", // Button hover color
    icon: "#000000", // Dark icon color
    searchBorder: "#cccccc", // Light search border
    avatarBg: "#ffeb3b", // Avatar background color
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: colors.background,
      color: colors.text,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
    },
    navbarLeft: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    navbarRight: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    item: {
      fontSize: "16px",
      cursor: "pointer",
      padding: "5px 10px",
      borderRadius: "4px",
      transition: "background-color 0.2s ease-in-out",
    },
    itemHover: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    dropdown: {
      cursor: "pointer",
      fontSize: "16px",
    },
    createButton: {
      padding: "6px 18px",
      backgroundColor: colors.button,
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background-color 0.2s ease-in-out",
    },
    createButtonHover: {
      backgroundColor: colors.buttonHover,
    },
    searchBar: {
      padding: "6px 10px",
      borderRadius: "6px",
      border: `1px solid ${colors.searchBorder}`,
      outline: "none",
      transition: "box-shadow 0.2s ease-in-out",
    },
    searchBarFocus: {
      boxShadow: `0 0 6px ${colors.button}`,
    },
    icon: {
      fontSize: "18px",
      cursor: "pointer",
      padding: "5px",
      transition: "color 0.2s ease-in-out",
    },
    iconHover: {
      color: colors.button,
    },
    avatar: {
      width: "32px",
      height: "32px",
      backgroundColor: colors.avatarBg,
      color: colors.text,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      fontWeight: "bold",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navbarLeft}>
        <div style={styles.icon}>▦</div>
        <div style={styles.item}>Trello</div>
        <div style={styles.dropdown}>Workspaces ▼</div>
        <div style={styles.dropdown}>Recent ▼</div>
        <div style={styles.dropdown}>Starred ▼</div>
        <div style={styles.dropdown}>Templates ▼</div>
        <button
          style={styles.createButton}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = styles.createButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = styles.createButton.backgroundColor)
          }
        >
          Create
        </button>
      </div>

      <div style={styles.navbarRight}>
        <input
          type="text"
          style={styles.searchBar}
          placeholder="Search"
          onFocus={(e) =>
            (e.target.style.boxShadow = styles.searchBarFocus.boxShadow)
          }
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />
        <div
          style={styles.icon}
          onMouseEnter={(e) => (e.target.style.color = styles.iconHover.color)}
          onMouseLeave={(e) => (e.target.style.color = "inherit")}
        >
          Share
        </div>
      </div>
    </div>
  );
};

export default Navbar3;
