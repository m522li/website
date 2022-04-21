import React from "react";
import { motion } from "framer-motion";
import './Cards.css'


function Cards({click, show, id, text, src, desc, expand}) {

    if (!show) return null;
   

    return(
        <motion.div className="box-part text-center">
        <motion.div transition={{layout:{duration: 1, type:"spring"}}} className="card" onClick={e => click(id)}
        style={{borderRadius: '2rem', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)'}}>
        
            <motion.h2 className="title">
            <img src={src} alt="icon" width="40" height="40"/>
            </motion.h2>
            {expand && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}} className="expand">
            <h2>{text}</h2>
            <p>
                {desc}
            </p> 
            </motion.div>
            )}
        </motion.div>
        </motion.div>
   

    );
}

export default Cards

