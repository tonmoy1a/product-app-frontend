import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import Http from "../Util/Http"

function ProductCreateComponant(){

    const history = useHistory();
    const {productId} = useParams()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        if(productId){
            getProduct()
        }
    },[])

    const getProduct = async() => {
        try {
            let product = await Http.get('api/product/'+productId)
            
            setTitle(product.data.title)
            setDescription(product.data.description)
            setPrice(product.data.price)
        } catch (error) {
            console.log(error.response)
        }
    }
    
    const createProduct = async (e) => {
        e.preventDefault()

        let inputImage = document.getElementById('image').files[0];

        let formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('image', inputImage)
        
        try {
            await Http.post('api/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            history.push('/product')

        } catch (error) {
            console.log(error)
        }
        
    }

    return(
        <div className=" row justify-content-center">
            
            <div className="col-md-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        {productId ? <>Update Product {productId}</>:<>Create Product</>}
                    </div>
                    <div className="card-body">
                    <form onSubmit={createProduct}>
                        <div className="form-group mb-2">
                            <label>Title</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} class="form-control" placeholder="Product Title" required/>
                        </div>

                        <div class="form-group mb-2">
                            <label>Description</label>
                            <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Product Description" required></textarea>
                        </div>

                        <div class="form-group mb-2">
                            <label>Price</label>
                            <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} class="form-control" placeholder="0" required/>
                        </div>

                        <div class="form-group mb-2">
                            <label>Product Image</label>
                            <input type="file" name="image" id="image" class="form-control" required/>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </div>
                </div>
                    
            </div>     
        </div>
    )
}

export default ProductCreateComponant