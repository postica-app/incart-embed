import { ProductCard, ProductType, Callout } from 'incart-fe-common'
import React from 'react'
import { Suspense } from 'react'
import { loader } from './Loader'
import './style.css'

export type Doc<T> = T & { id: string }

const UUID_REGEX =
    /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/

function checkIsValidUUID(source: string) {
    const hasProperLength = source.replaceAll('-', '').length === 32
    const isMatchToRegex = UUID_REGEX.test(source)

    return hasProperLength && isMatchToRegex
}

const fetchProduct = () => {
    let product: Doc<ProductType> | undefined | null = undefined
    const promise = fetch(
        import.meta.env.VITE_POSTGREST_URL +
            'rest/v1/product?select=*&limit=1&id=eq.' +
            location.pathname.slice(1),
        {
            headers: {
                apikey: import.meta.env.VITE_POSTGREST_KEY,
            },
        }
    )
        .then((res) => res.json())
        .then((res) => {
            if (res.length === 0) alert('상품을 찾을 수 없습니다')
            product = res[0]
        })
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
        </>
    )
}

export default () => {
    if (!checkIsValidUUID(location.pathname.slice(1)))
        return (
            <Callout>
                임베드가 올바르지 않습니다. 주소를 다시 복사해주세요.
            </Callout>
        )

    const product = fetchProduct()

    return (
        <Suspense fallback={<>{loader}</>}>
            <ProductViewer getter={product} />
        </Suspense>
    )
}
