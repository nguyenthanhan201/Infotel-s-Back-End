type CheckOrderResponse = {
  result_code: string;
  result_data: {
    token_code: string;
    version: string;
    order_code: string;
    order_description: string;
    amount: string;
    sender_fee: number;
    receiver_fee: number;
    currency: string;
    return_url: string;
    cancel_url: string;
    notify_url: string;
    status: number;
    payment_method_code: string;
    payment_method_name: string;
    message: string;
    message_error: string;
  };
  result_message: string;
};

export { CheckOrderResponse };
