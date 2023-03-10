/* tslint:disable */
/* eslint-disable */
/**
 * AlexProof
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    CreateOrder,
    CreateOrderFromJSON,
    CreateOrderToJSON,
    FindOrders,
    FindOrdersFromJSON,
    FindOrdersToJSON,
    OrderDetail,
    OrderDetailFromJSON,
    OrderDetailToJSON,
    OrderDetailList,
    OrderDetailListFromJSON,
    OrderDetailListToJSON,
    UpdateOrder,
    UpdateOrderFromJSON,
    UpdateOrderToJSON,
} from '../models';

export interface OrdersIdDeleteRequest {
    id: string;
}

export interface OrdersIdPutRequest {
    id: string;
    updateOrder?: UpdateOrder;
}

export interface OrdersPostRequest {
    createOrder?: CreateOrder;
}

export interface OrdersSearchPostRequest {
    findOrders?: FindOrders;
}

/**
 * 
 */
export class OrdersApi extends runtime.BaseAPI {

    /**
     */
    async ordersIdDeleteRaw(requestParameters: OrdersIdDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling ordersIdDelete.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/Orders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async ordersIdDelete(requestParameters: OrdersIdDeleteRequest): Promise<void> {
        await this.ordersIdDeleteRaw(requestParameters);
    }

    /**
     */
    async ordersIdPutRaw(requestParameters: OrdersIdPutRequest): Promise<runtime.ApiResponse<OrderDetail>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling ordersIdPut.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/Orders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateOrderToJSON(requestParameters.updateOrder),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderDetailFromJSON(jsonValue));
    }

    /**
     */
    async ordersIdPut(requestParameters: OrdersIdPutRequest): Promise<OrderDetail> {
        const response = await this.ordersIdPutRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async ordersPostRaw(requestParameters: OrdersPostRequest): Promise<runtime.ApiResponse<OrderDetail>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/Orders`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateOrderToJSON(requestParameters.createOrder),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderDetailFromJSON(jsonValue));
    }

    /**
     */
    async ordersPost(requestParameters: OrdersPostRequest): Promise<OrderDetail> {
        const response = await this.ordersPostRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async ordersSearchPostRaw(requestParameters: OrdersSearchPostRequest): Promise<runtime.ApiResponse<OrderDetailList>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = typeof token === 'function' ? token("bearer", []) : token;

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/Orders/search`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FindOrdersToJSON(requestParameters.findOrders),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderDetailListFromJSON(jsonValue));
    }

    /**
     */
    async ordersSearchPost(requestParameters: OrdersSearchPostRequest): Promise<OrderDetailList> {
        const response = await this.ordersSearchPostRaw(requestParameters);
        return await response.value();
    }

}
