import { useEffect, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"
import Http from "../Util/Http"
import ProductService from "./ProductService"

function ProductCreateComponant(){

    const history = useHistory()
    const {productId} = useParams()
    const location = useLocation()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)
    const [isFormSubmited, setIsFormSubmited] = useState(false)
    
    useEffect(() => {
        if(productId){
            getProduct()
        }else{
            setTitle('')
            setDescription('')
            setPrice('')
            setImage('')
        }
    },[location])

    const getProduct = async() => {
        let product = await ProductService.getProduct(productId)
        if(product){
            setTitle(product.title)
            setDescription(product.description)
            setPrice(product.price)
            setImage(product.image)
        }
    }

    const submitProduct = async (e) => {
        e.preventDefault()
        setIsFormSubmited(true)
        let inputImage = document.getElementById('image').files[0];
        if(productId){
            let updated = await ProductService.updateProduct(title, description, price, inputImage, productId);

            if(updated){
                setImage(updated.image)
                setIsUpdated(true)
            }
            
        }else{
            let create = await ProductService.createProduct(title, description, price, inputImage);
            if(create){
                history.push('/product')
            }
        }
        setIsFormSubmited(false)
    }

    return(
        <div className=" row justify-content-center">
            
            <div className="col-md-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        {productId ? <>Update Product {productId}</>:<>Create Product</>}
                    </div>
                    <div className="card-body">
                    <form onSubmit={submitProduct}>
                        {isUpdated && 
                        <div className="alert alert-success" >
                            Product Data Updated
                        </div>
                        }
                        <div className="form-group mb-2">
                            <label>Title</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Product Title" required/>
                        </div>

                        <div className="form-group mb-2">
                            <label>Description</label>
                            <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Product Description" required></textarea>
                        </div>

                        <div className="form-group mb-2">
                            <label>Price</label>
                            <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} className="form-control" placeholder="0" required/>
                        </div>

                        {productId &&
                        <img width="250" src={'http://localhost:8000/storage/products/'+image} alt=""/>
                        }

                        <div className="form-group mb-2">
                            <label>Product Image</label>
                            <input type="file" name="image" id="image" className="form-control" required={!productId}/>
                        </div>
                        
                        <button type="submit" className="btn btn-primary" disabled={isFormSubmited}>{isFormSubmited ? <>Working</>:<>Submit</>}</button>
                    </form>
                    </div>
                </div>
                    
            </div>     
        </div>
    )
}

export default ProductCreateComponant