import { useEffect, useState } from "react"
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Http from "../Util/Http"
import ProductService from "./ProductService";

function ProductComponant(){

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async() => {
        let getproducts = await ProductService.getProducts();

        if(getproducts){
            setProducts(getproducts);
        }
    }

    const deleteProduct = async (id) => {

        let deleteProduct = await ProductService.deleteProduct(id);

        if(deleteProduct){
            setProducts((prev) => {
                let index = prev.findIndex(p => p.id===id)
                if (index > -1) {
                    prev.splice(index, 1);
                }
                return [...prev];
            })
        }
    }

    return(
        <div className="row justify-content-center">
            <div className="col-md-10 mt-5">
                <div className="card">
                    <div className="card-header">
                        All Products
                    </div>
                    <div>
                    {products.length > 0 ?
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Image</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Created At</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((val, index)=>(
                            <tr key={index}>
                                <th scope="row">{val.id}</th>
                                <td>{val.title}</td>
                                <td>
                                    <img width="250" src={'http://localhost:8000/storage/products/'+val.image} alt=""/>
                                </td>
                                <td>{val.description}</td>
                                <td>{val.price}</td>
                                <td><Moment format="DD/MM/YYYY">{val.created_at}</Moment></td>
                                <td>
                                    <Link to={'product/edit/'+val.id} className="btn btn-primary btn-sm m-lg-1">Edit</Link> 
                                    <button className="btn btn-danger btn-sm" onClick={(e) => deleteProduct(val.id)}>DELETE</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        :
                        <p className="text-center">
                            <strong>No Products</strong>
                        </p>
                        }
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default ProductComponant