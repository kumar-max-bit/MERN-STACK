const Nav = ({ cartCount }) => {
  return (
    
    <nav style={{backgroundColor:"goldenrod",height:"90px"}}>

      <ol style={ListStyle.outerlist}>
      
        <li style={ListStyle.list}>Home</li>
        <li style={ListStyle.list}>login</li>
        <li style={ListStyle.list}>Register</li>
        <li style={ListStyle.list}>About</li>
        <li style={ListStyle.list}>Cart: {cartCount || 0}</li>
      </ol>
    </nav>
  );
};




const ListStyle ={
    list:{
        listStyleType: 'none',
        padding: "10px 20px",
        fontSize:"20px",
        backgroundColor:"red",
        fontStyle:"italic",
        fontWeight:"bold",
        textAlign:"center"
        
    },

     outerlist:{
        display:"flex",
        justifyContent:"space-evenly",
        alignItems:"center",
        height:"80px",
        listStyle:"none"
    }
}




  










export default Nav;