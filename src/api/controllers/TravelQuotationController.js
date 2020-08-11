/**
 * TravelQuotationController class
 */
export class TravelQuotationController {
  /**
   * getBestQuotation method
   * Used to get the best travel quotation
   * @param {Request} req
   * @param {Response} res
   */
  getBestQuotation(req, res) {
    // get best travel quotation using context a context

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({teste: 123}));
    return;
  }
}
