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
 * @interface OrderDetail
 */
export interface OrderDetail {
    /**
     * 
     * @type {string}
     * @memberof OrderDetail
     */
    id?: string;
    /**
     * 
     * @type {OrderType}
     * @memberof OrderDetail
     */
    orderType?: OrderType;
    /**
     * 
     * @type {string}
     * @memberof OrderDetail
     */
    customerName?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof OrderDetail
     */
    createDateTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof OrderDetail
     */
    createUser?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof OrderDetail
     */
    updateDateTime?: Date | null;
    /**
     * 
     * @type {string}
     * @memberof OrderDetail
     */
    updateUser?: string | null;
}

export function OrderDetailFromJSON(json: any): OrderDetail {
    return OrderDetailFromJSONTyped(json, false);
}

export function OrderDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderDetail {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'orderType': !exists(json, 'orderType') ? undefined : OrderTypeFromJSON(json['orderType']),
        'customerName': !exists(json, 'customerName') ? undefined : json['customerName'],
        'createDateTime': !exists(json, 'createDateTime') ? undefined : (new Date(json['createDateTime'])),
        'createUser': !exists(json, 'createUser') ? undefined : json['createUser'],
        'updateDateTime': !exists(json, 'updateDateTime') ? undefined : (json['updateDateTime'] === null ? null : new Date(json['updateDateTime'])),
        'updateUser': !exists(json, 'updateUser') ? undefined : json['updateUser'],
    };
}

export function OrderDetailToJSON(value?: OrderDetail | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'orderType': OrderTypeToJSON(value.orderType),
        'customerName': value.customerName,
        'createDateTime': value.createDateTime === undefined ? undefined : (value.createDateTime.toISOString()),
        'createUser': value.createUser,
        'updateDateTime': value.updateDateTime === undefined ? undefined : (value.updateDateTime === null ? null : value.updateDateTime.toISOString()),
        'updateUser': value.updateUser,
    };
}


