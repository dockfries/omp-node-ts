import { ColorEnum } from "@/enums/color";
import { DynamicPickup, DynamicPickupEvent } from "@infernus/core";
import { playerEvent } from "../player";

const cone = new DynamicPickup({
  modelid: 19135,
  type: 1,
  x: 1536.8569,
  y: -1688.5819,
  z: 13.5469,
  streamdistance: 20,
  worldid: 0,
  interiorid: 0,
});

const pickupEvent = new DynamicPickupEvent(playerEvent.getPlayersMap(), true);

pickupEvent.onPlayerPickUp = (player, pickup) => {
  if (pickup.id === cone.id) {
    player.sendClientMessage(
      ColorEnum.WhiteNumber,
      `You touched a cone, id: ${pickup.id}`
    );
  }
  return true;
};

export { cone, pickupEvent };
