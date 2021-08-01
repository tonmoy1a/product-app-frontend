import Http from "../Util/Http";

class ProductService {

    static getProducts = async() => {
        try {
            let getproducts = await Http.get('/api/product', {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            
            return getproducts.data;
        } catch (error) {
            
        }
    }

    static getProduct = async(productId) => {
        
        try {
            let product = await Http.get('api/product/'+productId, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            
            return product.data;

        } catch (error) {
            console.log(error)
            return false
        }
    }

    static createProduct = async (title, description, price, inputImage) => {

        let formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('image', inputImage)
        
        try {
            await Http.post('api/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            return true

        } catch (error) {
            console.log(error)
            return false
        }
    }

    static updateProduct = async (title, description, price, inputImage, productId) => {

        let formData = new FormData();
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('image', inputImage)
        formData.append('_method', 'put');
        
        try {
            let productUpdate = await Http.post('api/product/'+productId, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            return productUpdate.data

        } catch (error) {
            console.log(error)
            return false
        }
    }

    static deleteProduct = async (id) => {
        try {
            await Http.delete('/api/product/'+id,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            
            return true
        } catch (error) {
            console.log(error)
            return false
        }
        
    }

}

export default ProductService