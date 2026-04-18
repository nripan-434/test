import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoutes=({children})=>{
  const { user } = useSelector(s => s.Auth)
   if (!user) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        return <Navigate to='/login' replace />
    }
    return children
}
export default ProtectedRoutes