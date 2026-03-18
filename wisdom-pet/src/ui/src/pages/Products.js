import React, { useLayoutEffect, useState, useCallback } from 'react';
import { getCurrency } from '../Utils';

const Products = () => {
    const [products, setProducts] = useState([])
    const [vendors, setVendors] = useState(new Map())

    // Función para llamar a la API y borrar un producto ---
    // Usamos useCallback para que la función no se recree innecesariamente
    const handleDeleteProduct = useCallback(async (productId) => {

        // Confirmación básica para evitar borrados accidentales
      /*  if (!window.confirm("¿Estás seguro de que deseas borrar este producto?")) {
            return;
        }*/

            try {
                // Llamada a la API de eliminación (corresponde a @DeleteMapping("/{id}") en tu backend)
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Si la eliminación fue exitosa, actualizamos el estado localmente
                    // Esto elimina el producto de la tabla en el navegador AL INSTANTE
                    setProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
                    console.log(`Producto ${productId} borrado con éxito.`);
                    // Opcional: Podrías mostrar una notificación de éxito aquí
                } else {
                    // Manejo de error si la API responde con un código que no es OK
                    console.error(`Error de la API al borrar: ${response.status} ${response.statusText}`);
                    alert("Hubo un problema al intentar borrar el producto.");
                }
            } catch (error) {
                // Manejo de errores de red o excepciones generales
                console.error("Error de red al intentar borrar:", error);
                alert("Error de red. Por favor, inténtalo de nuevo.");
            }
        }, []); // El array de dependencias está vacío porque la función es autónoma



  const add = (key, value) => {
    setVendors(prev => new Map([...prev, [key, value]]))
  }

  useLayoutEffect(() => {

    const fetchData = async () => {
            try {
                // Cargamos ambos en paralelo para mayor velocidad
                const [prodRes, vendRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/vendors')
                ]);

                const productsData = await prodRes.json();
                const vendorsData = await vendRes.json();

                // Llenamos el mapa de vendedores primero
                vendorsData.forEach(vendor => {
                    add(vendor.vendorId, vendor);
                });

                // Luego seteamos los productos
                setProducts(productsData);
            } catch (e) {
                console.error("Error cargando datos:", e);
            }
        };

        fetchData();

    /*  const getProducts = async() => {
        const res = await fetch('/api/products')
        const products = await res.json()
        setProducts(products)
      }
      const getVendors = async () => {
        const res = await fetch('/api/vendors')
        const vendors = await res.json()
        vendors.map(vendor => {
          const {
            vendorId
          } = vendor;
          add(vendorId, vendor)
        })
      }
      getProducts().catch(e => {
        console.log("error fetching products: " + e)
      });
      getVendors().catch(e => {
        console.log("error fetching vendors: " + e)
      })*/
    },[])


  return (
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Vendor</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {products.map(product => {
        const {
          productId,
          name,
          price,
          vendorId
        } = product;
        return (
          <tr key={productId}>
            <td style={{ padding: '8px' }}>{productId}</td>
            <td style={{ padding: '8px' }}>{name}</td>
            <td style={{ padding: '8px' }}>{getCurrency(price)}</td>
            <td style={{ padding: '8px' }}>{vendors.get(vendorId)?.name || 'Cargando...'}</td>
            <td style={{ padding: '8px' }}>
                <button onClick={() => handleDeleteProduct(productId)}
                    style={{
                        backgroundColor: '#dc3545', // Color rojo estándar para borrar
                        color: 'white', border: 'none',
                        padding: '5px 10px', borderRadius: '4px',
                        cursor: 'pointer'}} >Borrar
                </button>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

export default Products;
