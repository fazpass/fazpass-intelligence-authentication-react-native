package com.fiareact

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.fazpass.fia.FIAFactory
import com.fazpass.fia.objects.OtpAuthType
import com.fazpass.fia.objects.OtpPromise

private typealias TransactionId = String

@ReactModule(name = FiaReactModule.NAME)
class FiaReactModule(reactContext: ReactApplicationContext): NativeFiaReactSpec(reactContext) {

  private val fia = FIAFactory.getInstance()

  private val promises = hashMapOf<TransactionId, OtpPromise>()

  override fun getName(): String {
    return NAME
  }

  override fun initialize(merchantKey: String?, merchantAppId: String?) {
    fia.initialize(
      reactApplicationContext.applicationContext,
      merchantKey ?: "",
      merchantAppId ?: ""
    )
  }

  override fun otp(purpose: String?, phone: String?, callback: Callback?) {
    reactApplicationContext.currentActivity?.let {
      val promising: (OtpPromise) -> Unit = { promise ->
        promises[promise.transactionId] = promise
        val obj = Arguments.createMap().apply {
          putString("transactionId", promise.transactionId)
          putString("authType", promise.authType.toString())
          putBoolean("hasException", promise.hasException)

          if (promise.hasException)
            putString("exception", promise.exception.stackTraceToString())
          else
            putNull("exception")

          if (promise.authType == OtpAuthType.Message
            || promise.authType == OtpAuthType.Miscall)
            putDouble("digitCount", promise.digitCount.toDouble())
          else
            putNull("digitCount")
        }
        callback?.invoke(obj)
      }
      when (purpose) {
        "login" -> fia.otp(it).login(phone ?: "", promising)
        "register" -> fia.otp(it).register(phone ?: "", promising)
        "transaction" -> fia.otp(it).transaction(phone ?: "", promising)
        "forgetPassword" -> fia.otp(it).forgetPassword(phone ?: "", promising)
        else -> fia.otp(it).login(phone ?: "", promising)
      }
    }
  }

  override fun validateOtp(
    transactionId: String?,
    otp: String?,
    onError: Callback?,
    onSuccess: Callback?
  ) {
    val promise = promises[transactionId]
    promise?.let {
      it.validate(
        otp ?: "",
        { err -> onError?.invoke(err.stackTraceToString()) },
        { onSuccess?.invoke() }
      )
    }
  }

  override fun validateHE(transactionId: String?, onError: Callback?, onSuccess: Callback?) {
    val promise = promises[transactionId]
    promise?.let {
      it.validateHE(
        { err -> onError?.invoke(err.stackTraceToString()) },
        { onSuccess?.invoke() }
      )
    }
  }

  override fun listenToMiscall(transactionId: String?, callback: Callback?) {
    val promise = promises[transactionId]
    promise?.let {
      it.listenToMiscall { otp -> callback?.invoke(otp) }
    }
  }

  override fun forgetPromise(transactionId: String?) {
    transactionId?.let { promises.remove(it) }
  }

  companion object {
    const val NAME = "FiaReact"
  }
}
