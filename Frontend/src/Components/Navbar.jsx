import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ click, setClick ,setback}) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const [templatesOpen, setTemplatesOpen] = useState(false); // State to toggle templates dropdown
  const userId = localStorage.getItem("userId");
  const [bg,setbg]=useState("")

  const checkExpiry = async () => {
    const response = await axios.post("http://localhost:3030/auth/expirytime", {
      userId: userId,
    });
    setTime(response.data);
  };
  const handleimage=(src)=>{
    setbg(src)
  }
  const setbgurl = async () => {
    const response = await axios.post("http://localhost:3030/auth/setbgurl", {
      userId: userId,
      bgurl:bg,
    });
    setback("")
  };
  useEffect(() => {
    setbgurl();
  }, [bg]);
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev); // Toggle the menu visibility
  };

  const handleTemplatesToggle = () => {
    setTemplatesOpen((prev) => !prev); // Toggle the templates dropdown
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
    alert("Logged out successfully!");
  };

  useEffect(() => {
    checkExpiry();
  }, [userId]);

  return (
    <header style={styles.navbar}>
      <div style={styles.brand}>
        <h1 style={styles.title}>Task Manager</h1>
        <Link to={"/"} style={styles.btn}>
          Board
        </Link>
        <Link to={"/table"} style={styles.btn}>
          Table
        </Link>
        <Link to={"/Calendar"} style={styles.btn}>
          Calendar
        </Link>
        <Link to={"/map"} style={styles.btn}>
          Map
        </Link>

        {/* Templates Dropdown Button */}
        <div style={styles.templatesBtn} onClick={handleTemplatesToggle}>
          Templates ▼
        </div>
        {templatesOpen && (
          <div  style={styles.dropdownMenu}>
            <div onClick={()=>handleimage("https://images.unsplash.com/photo-1520538324409-6bacb40867e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmxzfGVufDB8fDB8fHww")} style={styles.dropdownItem}>
              <div><img src="https://images.unsplash.com/photo-1520538324409-6bacb40867e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdpcmxzfGVufDB8fDB8fHww" alt="" width={50}/></div>
              <div>rose</div>
            </div>
            <div onClick={()=>handleimage("https://images.unsplash.com/photo-1525123900445-13ac95115c39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdpcmxzfGVufDB8fDB8fHww")} style={styles.dropdownItem}>
              <div><img src="https://images.unsplash.com/photo-1525123900445-13ac95115c39?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdpcmxzfGVufDB8fDB8fHww" alt="" width={50}/></div>
              <div>rose</div>
            </div>
            <div onClick={()=>handleimage("https://images.unsplash.com/photo-1461685265823-f8d5d0b08b9b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdpcmxzfGVufDB8fDB8fHww")} style={styles.dropdownItem}>
              <div><img src="https://images.unsplash.com/photo-1461685265823-f8d5d0b08b9b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdpcmxzfGVufDB8fDB8fHww" alt="" width={50}/></div>
              <div>rose</div>
            </div>
            
 </div>
        )}
      </div>

      <nav style={styles.nav}>
        {!userId ? (
          <>
            <Link to={"/Login"}>
              <button style={styles.button}>Login</button>
            </Link>
            <Link to={"/Signup"}>
              <button style={{ ...styles.button, ...styles.signupButton }}>
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <button style={styles.button}>{time} days left</button>
            <div
              style={{
                ...styles.threeDotMenu,
                ...(menuOpen ? styles.threeDotMenuHover : {}),
              }}
              onClick={handleMenuToggle}
            >
              ⋮
            </div>
            {menuOpen && (
              <div style={styles.dropdownMenu1}>
                <button
                  style={styles.dropdownItem}
                  onClick={() => navigate("/updateusername")}
                >
                  <span style={styles.dropdownItemIcon}>👤</span> Update Username
                </button>
                <button
                  style={styles.dropdownItem}
                  onClick={() => navigate("/resetpassword")}
                >
                  <span style={styles.dropdownItemIcon}>🔒</span> Reset Password
                </button>
                <button style={styles.dropdownItem} onClick={handleLogout}>
                  <span style={styles.dropdownItemIcon}>🚪</span> Logout
                </button>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#6a0dad", // Vibrant purple
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  brand: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    margin: 0,
    color: "#fff",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  button: {
    backgroundColor: "#fff",
    color: "#6a0dad",
    border: "none",
    padding: "10px 20px",
    marginLeft: "10px",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  signupButton: {
    backgroundColor: "#ff7043",
    color: "#fff",
    fontWeight: "600",
  },
  btn: {
    padding: "10px 15px",
    margin: "7px 10px",
    borderRadius: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#6a0dad",
    textDecoration: "none",
    fontWeight: "500",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
  },
  templatesBtn: {
    padding: "10px 15px",
    margin: "7px 10px",
    borderRadius: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#6a0dad",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "14px",
  },
  threeDotMenu: {
    fontSize: "22px",
    marginLeft: "10px",
    cursor: "pointer",
    color: "#fff",
    padding: "8px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: "background 0.3s ease, transform 0.3s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  threeDotMenuHover: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    transform: "scale(1.1)",
  },
  dropdownMenu: {
    position: "absolute",
    top: "60px",
    right: "490px",
    backgroundColor: "#fff",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    zIndex: 1000,
    overflow: "hidden",
    animation: "fadeIn 0.3s ease",
    minWidth: "200px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },  dropdownMenu1: {
    position: "absolute",
    top: "60px",
    right: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    zIndex: 1000,
    overflow: "hidden",
    animation: "fadeIn 0.3s ease",
    minWidth: "200px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
  },
  dropdownItem: {
    padding: "15px 20px",
    backgroundColor: "#fff",
    color: "#444",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background 0.3s ease, color 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  dropdownItemHover: {
    backgroundColor: "rgba(106, 13, 173, 0.1)",
    color: "#6a0dad",
  },
  dropdownItemIcon: {
    fontSize: "18px",
    color: "#6a0dad",
  },
};

export default Navbar;
