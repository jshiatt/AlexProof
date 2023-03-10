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

import { exists, mapValues } from '../runtime';
import {
    OrderDetail,
    OrderDetailFromJSON,
    OrderDetailFromJSONTyped,
    OrderDetailToJSON,
} from './';

/**
 * 
 * @export
 * @interface OrderDetailList
 */
export interface OrderDetailList {
    /**
     * 
     * @type {Array<OrderDetail>}
     * @memberof OrderDetailList
     */
    orders?: Array<OrderDetail> | null;
    /**
     * 
     * @type {number}
     * @memberof OrderDetailList
     */
    total?: number;
}

export function OrderDetailListFromJSON(json: any): OrderDetailList {
    return OrderDetailListFromJSONTyped(json, false);
}

export function OrderDetailListFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderDetailList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'orders': !exists(json, 'orders') ? undefined : (json['orders'] === null ? null : (json['orders'] as Array<any>).map(OrderDetailFromJSON)),
        'total': !exists(json, 'total') ? undefined : json['total'],
    };
}

export function OrderDetailListToJSON(value?: OrderDetailList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'orders': value.orders === undefined ? undefined : (value.orders === null ? null : (value.orders as Array<any>).map(OrderDetailToJSON)),
        'total': value.total,
    };
}


