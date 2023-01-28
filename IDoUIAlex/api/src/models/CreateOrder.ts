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
    OrderType,
    OrderTypeFromJSON,
    OrderTypeFromJSONTyped,
    OrderTypeToJSON,
} from './';

/**
 * 
 * @export
 * @interface CreateOrder
 */
export interface CreateOrder {
    /**
     * 
     * @type {OrderType}
     * @memberof CreateOrder
     */
    orderType?: OrderType;
    /**
     * 
     * @type {string}
     * @memberof CreateOrder
     */
    customerName?: string | null;
}

export function CreateOrderFromJSON(json: any): CreateOrder {
    return CreateOrderFromJSONTyped(json, false);
}

export function CreateOrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateOrder {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'orderType': !exists(json, 'orderType') ? undefined : OrderTypeFromJSON(json['orderType']),
        'customerName': !exists(json, 'customerName') ? undefined : json['customerName'],
    };
}

export function CreateOrderToJSON(value?: CreateOrder | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'orderType': OrderTypeToJSON(value.orderType),
        'customerName': value.customerName,
    };
}


