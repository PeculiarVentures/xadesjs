### Input document
```xml
<?xml version="1.0" encoding="UTF-8"?>
<TrustServiceStatusList Id="ID0001" TSLTag="http://uri.etsi.org/19612/TSLTag" xmlns="http://uri.etsi.org/02231/v2#" xmlns:ns3="http://uri.etsi.org/02231/v2/additionaltypes#">
   <SchemeInformation>
      <TSLVersionIdentifier>4</TSLVersionIdentifier>
      <TSLSequenceNumber>134</TSLSequenceNumber>
      <TSLType>http://uri.etsi.org/TrstSvc/TrustedList/TSLType/EUlistofthelists</TSLType>
      <SchemeOperatorName>
         <Name xml:lang="en">European Commission</Name>
         <Name xml:lang="bg">Европейска комисия</Name>
         <Name xml:lang="es">Comisión Europea</Name>
         <Name xml:lang="cs">Evropská komise</Name>
         <Name xml:lang="da">Europa-Kommissionen</Name>
         <Name xml:lang="de">Europäische Kommission</Name>
         <Name xml:lang="et">Euroopa Komisjon</Name>
         <Name xml:lang="el">Ευρωπαϊκή Επιτροπή</Name>
         <Name xml:lang="fr">Commission européenne</Name>
         <Name xml:lang="it">Commissione europea</Name>
         <Name xml:lang="lv">Eiropas Komisija</Name>
         <Name xml:lang="lt">Europos Komisija</Name>
         <Name xml:lang="hu">Európai Bizottság</Name>
         <Name xml:lang="mt">Il-Kummissjoni Ewropea</Name>
         <Name xml:lang="nl">Europese Commissie</Name>
         <Name xml:lang="pl">Komisja Europejska</Name>
         <Name xml:lang="pt">Comissão Europeia</Name>
         <Name xml:lang="ro">Comisia Europeană</Name>
         <Name xml:lang="sk">Európska komisia</Name>
         <Name xml:lang="sl">Evropska komisija</Name>
         <Name xml:lang="fi">Euroopan komissio</Name>
         <Name xml:lang="sv">Europeiska kommissionen</Name>
      </SchemeOperatorName>
   </SchemeInformation>
</TrustServiceStatusList>
```

### C14N transformed
```xml
<TrustServiceStatusList xmlns="http://uri.etsi.org/02231/v2#" xmlns:ns3="http://uri.etsi.org/02231/v2/additionaltypes#" Id="ID0001" TSLTag="http://uri.etsi.org/19612/TSLTag"><SchemeInformation><TSLVersionIdentifier>4</TSLVersionIdentifier><TSLSequenceNumber>134</TSLSequenceNumber><TSLType>http://uri.etsi.org/TrstSvc/TrustedList/TSLType/EUlistofthelists</TSLType><SchemeOperatorName><Name xml:lang="en">European Commission</Name><Name xml:lang="bg">Европейска комисия</Name><Name xml:lang="es">Comisión Europea</Name><Name xml:lang="cs">Evropská komise</Name><Name xml:lang="da">Europa-Kommissionen</Name><Name xml:lang="de">Europäische Kommission</Name><Name xml:lang="et">Euroopa Komisjon</Name><Name xml:lang="el">Ευρωπαϊκή Επιτροπή</Name><Name xml:lang="fr">Commission européenne</Name><Name xml:lang="it">Commissione europea</Name><Name xml:lang="lv">Eiropas Komisija</Name><Name xml:lang="lt">Europos Komisija</Name><Name xml:lang="hu">Európai Bizottság</Name><Name xml:lang="mt">Il-Kummissjoni Ewropea</Name><Name xml:lang="nl">Europese Commissie</Name><Name xml:lang="pl">Komisja Europejska</Name><Name xml:lang="pt">Comissão Europeia</Name><Name xml:lang="ro">Comisia Europeană</Name><Name xml:lang="sk">Európska komisia</Name><Name xml:lang="sl">Evropska komisija</Name><Name xml:lang="fi">Euroopan komissio</Name><Name xml:lang="sv">Europeiska kommissionen</Name></SchemeOperatorName></SchemeInformation></TrustServiceStatusList>
```

### .NET digest from signature
```
BASE64: tYTAPcxCGgqAMBEib9yUL4dSBnFTOuYTojRsNtHz6oc=
HEX:    B584C03DCC421A0A803011226FDC942F87520671533AE613A2346C36D1F3EA87
```