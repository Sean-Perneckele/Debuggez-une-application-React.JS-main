import { fireEvent, render, screen,  } from "@testing-library/react";
import Page from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Page />);
    
    screen.getByText("Email");
    screen.getByText("Nom");
    screen.getByText("Prénom");
    screen.getByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Page />);
    
      fireEvent.click(screen.getByText("Envoyer"));
      
      screen.getByText("En cours");

      (screen.queryByText("Message envoyé !"));
    });
  });
});


describe("When a page is created", () => {
  it("a list of events is displayed",async () => {
    // to implement
  })
  it("a list a people is displayed",async () => {
    // to implement
  })
  it("a footer is displayed",async () => {
    // to implement
  })
  it("an event card, with the last event, is displayed",async () => {

    render(<Page />);
    screen.getByText("Notre derniére prestation")
    // to implement
  })
});
