import { ProductCard, ProductType } from 'incart-fe-common'
import React from 'react'
import { Suspense } from 'react'
import { loader } from './Loader'
import './style.css'

export type Doc<T> = T & { id: string }

const fetchProduct = () => {
    let product: Doc<ProductType> | undefined | null = undefined
    const promise = fetch(import.meta.env + location.pathname)
        .then((res) => res.json())
        .then((res) => (product = res))
        .catch((err) => {
            console.error(err)
            product = null
        })

    return () => {
        if (product === undefined) throw promise
        return product
    }
}

const ProductViewer: React.FC<{
    getter: () => Doc<ProductType> | null
}> = (props) => {
    const product = props.getter()
    if (!product) {
        return <>{loader}</>
    }
    return (
        <>
            <ProductCard
                product={product}
                onPurchase={(optionKey) => {
                    const child = window.open(
                        import.meta.env.VITE_PURCHASE_URL +
                            '?product_id=' +
                            product.id +
                            (optionKey
                                ? '&option_name=' +
                                  encodeURIComponent(optionKey)
                                : ''),
                        '_blank',
                        'popup, width=500, height=600'
                    )

                    child?.addEventListener('message', (event) =>
                        console.log(event.data)
                    )
                }}
            />
            {/* <iframe src={`data:text/html,${encodeURIComponent(element)}`} /> */}
        </>
    )
}

export default () => {
    const product = fetchProduct()

    return (
        <Suspense fallback={<>{loader}</>}>
            <ProductViewer getter={product} />
        </Suspense>
    )
}
