//
//  FiaReact.swift
//  FiaReactExample
//
//  Created by Andri nova riswanto on 05/05/25.
//

import Foundation
import FiaIOS

@objc public class FiaReact: NSObject {
  
  private let fia = FIAFactory.getInstance()
  
  @objc public func initialize(for merchantKey: String, merchantAppId: String) {
    fia.initialize(merchantKey, merchantAppId)
  }
  
  var promises: [String:OtpPromise] = [:]
  @objc public func otp(for purpose: String, phone: String, callback: @escaping ([Any]) -> Void) {
    let promising: (OtpPromise) -> Void = { promise in
      self.promises[promise.transactionId] = promise
      
      var obj = [:]
      obj["transactionId"] = promise.transactionId
      obj["hasException"] = promise.hasError
      
      switch (promise.authType) {
      case .Message:
        obj["authType"] = "Message"
        break
      case .Miscall:
        obj["authType"] = "Miscall"
        break
      case .HE:
        obj["authType"] = "He"
        break
      case .FIA:
        obj["authType"] = "FIA"
        break
      @unknown default:
        obj["authType"] = "Message"
        break
      }

      if (promise.hasError) {
        obj["exception"] = promise.error.localizedDescription
      } else {
        obj["exception"] = nil
      }
      
      if (promise.authType == OtpAuthType.Message
        || promise.authType == OtpAuthType.Miscall) {
        obj["digitCount"] = promise.digitCount
      } else {
        obj["digitCount"] = nil
      }
      callback([obj])
    }
    
    switch (purpose) {
    case "login":
      fia.otp().login(phone, promising)
      break
    case "register":
      fia.otp().login(phone, promising)
      break
    case "transaction":
      fia.otp().login(phone, promising)
      break
    case "forgetPassword":
      fia.otp().login(phone, promising)
      break
    default:
      fia.otp().login(phone, promising)
    }
  }
  
  @objc public func validateOtp(
    for transactionId: String,
    otp: String,
    onError: @escaping ([Any]) -> Void,
    onValidated: @escaping ([Any]) -> Void
  ) {
    guard let promise = promises[transactionId] else {
      onError(["No such transaction"])
      return
    }
    promise.validate(
      otp,
      { err in onError([err.localizedDescription]) },
      { onValidated([]) }
    )
  }
  
  @objc public func validateHE(
    for transactionId: String,
    onError: @escaping ([Any]) -> Void,
    onValidated: @escaping ([Any]) -> Void
  ) {
    guard let promise = promises[transactionId] else {
      onError(["No such transaction"])
      return
    }
    promise.validateHE(
      { err in onError([err.localizedDescription]) },
      { onValidated([]) }
    )
  }
  
  @objc public func listenToMiscall(
    for transactionId: String,
    callback: @escaping ([Any]) -> Void
  ) {}
  
  @objc public func forgetPromise(for transactionId: String) {
    promises.removeValue(forKey: transactionId)
  }
}
