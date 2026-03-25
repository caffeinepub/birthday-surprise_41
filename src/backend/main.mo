import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type Wish = {
    name : Text;
    message : Text;
  };

  module Wish {
    public func compare(wish1 : Wish, wish2 : Wish) : Order.Order {
      switch (Text.compare(wish1.name, wish2.name)) {
        case (#equal) { Text.compare(wish1.message, wish2.message) };
        case (order) { order };
      };
    };
  };

  let wishes = List.empty<Wish>();

  var birthdayDate : Text = "unknown";

  public shared ({ caller }) func addWish(name : Text, message : Text) : async () {
    let wish : Wish = {
      name;
      message;
    };
    wishes.add(wish);
  };

  public query func getAllWishes() : async [Wish] {
    wishes.values().toArray().sort();
  };

  public shared ({ caller }) func setBirthdayDate(newDate : Text) : async () {
    birthdayDate := newDate;
  };

  public query ({ caller }) func getBirthdayDate() : async Text {
    birthdayDate;
  };

  public query func getWish(name : Text) : async Wish {
    switch (wishes.values().toArray().find(func(wish) { wish.name == name })) {
      case (null) { Runtime.trap("Wish not found") };
      case (?wish) { wish };
    };
  };
};
