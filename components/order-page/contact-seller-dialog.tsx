import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Order } from "./order-card";

const ContactSellerDialog = ({ seller }: { seller: Order["seller"] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          Contact Seller
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact {seller.name}</DialogTitle>
          <DialogDescription>
            Send a message to the seller about your order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea placeholder="Type your message here" />
          <Button type="submit">Send Message</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSellerDialog;
