import useGetProducts from "./useGetProducts";

const useGetProductById = (productId) => {
  const { productos } = useGetProducts();

  return {
    producto: productos.find((producto) => producto.id === productId),
  };
};

export default useGetProductById;
