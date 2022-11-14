import React,{ useContext,useEffect,useState } from 'react'
import { DataContext } from '../../GlobalContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Loading = () => {
  return <div className="spinner-border text-success" role={'status'}> 
  <span className="visually-hidden">Loading...</span></div>
}
function StudentProfile() {
  const context = useContext(DataContext)
  const token = context.token
  const [currentUser] = context.data.authApi.currentUser

  const [img,setImg] =useState(false)
  const [loading,setLoading] = useState(false)

  const [user,setUser] = useState({
    name :"",
    mobile:""
  })
  const [isEdit,setIsEdit] = useState(false)

  const readValue = (e) => {
    const { name ,value} = e.target;
    setUser({...user,[name]:value})
  }
  
  useEffect(() =>{
    setImg(currentUser.image)
  },[img,currentUser])


  const handleUpload = async (e) =>{
    e.preventDefault();
    try {
      const file = e.target.files[0];
      console.log('image data =',file)
        //file validation
        if(!file)
        return toast.error('file not exists..Choose image to upload..');

        //size validation
        if(file.size > 1 * 1024 * 1024)
        return toast.warning("File size must be less than 1Mb")

        //append in form constructor
        let formData =new FormData()
        formData.append('profileImg',file)
        setLoading(true)

        //post image to server
        const res = await axios.post(`/api/v1/image/profileImage/upload`,formData,{
          headers :{
            'Content-Type':'multiport/form-data',
            Authorization:token
          }
        })

        //update db file
        await axios.patch(`/api/v1/user/update`,{image : res.data},{
          headers :{Authorization:token}
        });
        toast.success("Profile image updated successfully")

        //after upload
        setLoading(false)
        setImg(res.data)
        window.location.href="/student/profile"

    } catch (err) {
      toast.error(err.response.data.msg)
    }
  }

  const handleDestroy = async (e) => {
    try {
      if(window.confirm(`Are you sure to delete profile image?`)){
        setLoading(true)
        await axios.post(`/api/v1/image/profileImage/delete`,{public_id:img.public_id},{
          headers :{
            Authorization:token
          }
        })

        //update db file
        await axios.patch(`/api/v1/user/update`,
        { image : {url :"https://storiavoce.com/wp-content/plugins/lightbox/images/No-image-found.jpg"} }, {
          headers:{ Authorization :token}
        });
        toast.success("Profile image deleted successfully")
        
        setImg(false)
        setLoading(false)
        window.location.href = "/student/profile"
      }
    } catch (err) {
      toast.error(err.response.data.msg)
    }
  
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Student Profile</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
           <div className="row">
           <div className="col-md-4">
              <div className="card border-0">
                  <div className="position-relative">
                  {
                    img ? (<button onClick={handleDestroy} className="position-absolute top-0 start-100 bg-danger border-light rounded-circle translate-middle pt-0" ps-2 pe-2 text-white> X </button>):null
                  }
                  {
                    img ? <img src={img ? img.url : " "} alt="No Image Found" className="card-img" /> :
                    <img src={currentUser.image ? currentUser.image.url : "" } alt="No Image Found" className="card-img" />
                  }
                  {
                    loading ? <Loading/> :null 
                  }
                   
                  </div>
                  <div className="card-footer">
                     <div className="form-group">
                        <input type="file" name={"profileImg"} id ={"profileImg"} className="form-control" required onChange={handleUpload} />
                      </div>
                  </div>
              </div>
            </div>
               
            <div className="col-md-8">
              <div className="card-body">
                <h4 className="card-title text-center text-uppercase text-success">{currentUser.name}</h4>
                <hr />
                <p className="card-text">
                  <strong>Email</strong>
                  <strong className="float-end text-danger">{currentUser.email}</strong>
                </p>
                <hr />
                <p className="card-text">
                  <strong>Mobile</strong>
                  <strong className="float-end text-danger">{currentUser.mobile}</strong>
                </p>
                <hr />
                <p className="card-text">
                  <strong>Role</strong>
                  <strong className="float-end text-danger">{currentUser.role}</strong>
                </p>
              </div>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
} 


export default StudentProfile