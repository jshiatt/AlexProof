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

/**
 * 
 * @export
 * @enum {string}
 */
export enum OrderType {
    Standard = 0,
    SaleOrder = 1,
    PurchaseOrder = 2,
    TransferOrder = 3,
    ReturnOrder = 4
}

export function OrderTypeFromJSON(json: any): OrderType {
    return OrderTypeFromJSONTyped(json, false);
}

export function OrderTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderType {
    return json as OrderType;
}

export function OrderTypeToJSON(value?: OrderType | null): any {
    return value as any;
}

