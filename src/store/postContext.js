import { createContext, useState } from "react"
export const postContext=createContext(null)

function Post({ children }) {
    const [postDetiles, setPostDetiles] = useState({});

    return (
        <postContext.Provider value={{ postDetiles, setPostDetiles }}>
            {children}
        </postContext.Provider>
    );
}


export default Post
